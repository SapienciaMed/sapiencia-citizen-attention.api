import { Storage } from "@google-cloud/storage";
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import Database from "@ioc:Adonis/Lucid/Database";
import { EGrouperCodes } from "App/Constants/GrouperCodesEnum";
import { IFile } from "App/Interfaces/FileInterfaces";
import { IPerson, IPersonFilters } from "App/Interfaces/PersonInterfaces";
import {
  IPqrsdf,
  IPqrsdfFilters,
  IPqrsdfResponse,
  IReopenRequest,
  IResponseFilters,
  IrequestPqrsdf,
} from "App/Interfaces/PqrsdfInterfaces";
import { IUser } from "App/Interfaces/UserInterfaces";
import File from "App/Models/File";
import LpaListaParametro from "App/Models/LpaListaParametro";
import Person from "App/Models/Person";
import Pqrsdf from "App/Models/Pqrsdf";
import PqrsdfResponse from "App/Models/PqrsdfResponse";
import SrbSolicitudReabrir from "App/Models/SrbSolicitudReabrir";
import WorkEntity from "App/Models/WorkEntity";
import { IEmailService } from "App/Services/Contracts/IEmailService";
import { IAuthExternalService } from "App/Services/External/Contracts/IAuthExternalService";
import { IGenericListsExternalService } from "App/Services/External/Contracts/IGenericListsExternalService";
import { IPagingData } from "App/Utils/ApiResponses";
import { DateTime } from "luxon";
import { IPqrsdfRepository } from "./Contracts/IPqrsdfRepository";

//const keyFilename = process.env.GCLOUD_KEYFILE;
const bucketName = process.env.GCLOUD_BUCKET ?? "";

export default class PqrsdfRepository implements IPqrsdfRepository {
  storage: Storage;

  constructor(
    private GenericListsExternalService: IGenericListsExternalService,
    private AuthExternalService: IAuthExternalService,
    private EmailService: IEmailService
  ) {
    //this.storage = new Storage({ keyFilename }); //-->Local
    this.storage = new Storage();
  }

  async getPqrsdfByFilters(filters: IPqrsdfFilters): Promise<IPagingData<IPqrsdf>> {
    const query = Pqrsdf.query()
      .preload("person", (person) => {
        person.preload("entityType");
      })
      .preload("responsible", (responsible) => {
        responsible.preload("workEntityType", (workEntityType) => {
          workEntityType.preload("dependence");
        });
      })
      .preload("status")
      .preload("canalesAttencion")
      .preload("requestSubject")
      .preload("responseMedium")
      .preload("requestType")
      .preload("program")
      .preload("file");

    if (filters?.identification) {
      query.whereHas("person", (sub) => sub.where("identification", String(filters.identification)));
    }

    if (filters?.id) {
      query.where("id", filters.id);
    }

    if (filters?.filingNumber) {
      query.whereILike("filingNumber", `%${filters.filingNumber}%`);
    }

    if (filters?.programId) {
      query.where("programId", filters.programId);
    }

    if (filters?.requestType) {
      query.whereHas("requestSubject", (sub) => sub.where("ASO_CODIGO", String(filters.requestType)));
    }

    const res = await query.paginate(filters.page, filters.perPage);
    const { meta } = res.serialize();

    let serializeWorkEntity = await this.formatPqrsdfs(res.all());

    return {
      array: serializeWorkEntity,
      meta,
    };
  }

  private async formatPqrsdfs(pqrsdfs: Pqrsdf[]): Promise<IPqrsdf[]> {
    let pqrsdfsFormatted: IPqrsdf[] = [];

    const ids = pqrsdfs.map((pqrsdf) => pqrsdf?.responsible?.userId);

    let users: IUser[] = [];
    if (ids.length > 0) {
      users = (await this.AuthExternalService.getUsersByIds(ids)).data;
    }
    for await (const pqrsdf of pqrsdfs) {
      const user = users.find((user) => user.id == pqrsdf?.responsible?.userId);

      if (!user) continue;

      let pqrsdfFormatted = await this.formatPqrsdf(pqrsdf, user);
      if (pqrsdfFormatted) {
        pqrsdfsFormatted.push(pqrsdfFormatted);
      }
    }
    return pqrsdfsFormatted;
  }

  async createResponse(
    pqrsdf: IPqrsdf,
    file: MultipartFileContract,
    supportFiles: MultipartFileContract[] = []
  ): Promise<IPqrsdf | null> {
    let res: any = null;
    await Database.transaction(async (trx) => {
      if (pqrsdf.response && pqrsdf?.id) {
        const updatePqrsdfFields = ["requestTypeId", "responseMediumId", "programId", "requestSubjectId"];
        const lastResponse = await PqrsdfResponse.query()
          .where("pqrsdfId", pqrsdf.id)
          .orderBy("createdAt", "desc")
          .first();
        if (pqrsdf?.person) {
          await this.updatePerson(pqrsdf.person);
        }
        let uploadResponseFile = false;
        if (file) {
          const responseFile = await this.uploadBucket(file);
          uploadResponseFile = responseFile.upload;
          pqrsdf.response.file = {
            isActive: true,
            name: responseFile.filePath,
          };
        }
        let uploadSupportFiles: IFile[] = [];
        if (supportFiles.length) {
          for await (const supportFile of supportFiles) {
            let responseSFile = await this.uploadBucket(supportFile);
            if (responseSFile.upload) {
              uploadSupportFiles.push({
                isActive: true,
                name: responseSFile.filePath,
              });
            }
          }
        }
        const newFile =
          pqrsdf?.response?.file && uploadResponseFile
            ? (await File.create(pqrsdf?.response?.file)).useTransaction(trx)
            : null;
        if (newFile) {
          pqrsdf.response.fileId = newFile.id;
        }
        let newSupportFiles: File[] = [];
        if (uploadSupportFiles.length) {
          for await (const supportFile of uploadSupportFiles) {
            let newSupportFile = (await File.create(supportFile)).useTransaction(trx);
            newSupportFiles.push(newSupportFile);
          }
        }

        if (pqrsdf.motiveId) {
          updatePqrsdfFields.push("motiveId");
        }

        const respondingUserEntity = await this.getResponsibleByUserId(pqrsdf.response.respondingUserId);
        pqrsdf.response.respondingDependenceId = respondingUserEntity?.workEntityType.dependenceId;
        pqrsdf.response.workEntityId = respondingUserEntity?.id;
        //set assignedUser response data
        let assignedUserEntity: WorkEntity | null = null;
        if (pqrsdf.response?.assignedUserId) {
          if (lastResponse?.assignedUserId) {
            assignedUserEntity = await this.getResponsibleByUserId(lastResponse.assignedUserId);
          }
          if (!lastResponse?.assignedUserId || (lastResponse?.assignedUserId && !assignedUserEntity)) {
            assignedUserEntity = await this.getResponsibleByUserId(pqrsdf.response.assignedUserId);
          }

          pqrsdf.response.assignedDependenceId = lastResponse
            ? lastResponse.assignedDependenceId
            : assignedUserEntity?.workEntityType.dependenceId;
        }
        //set pqrsdf responsible
        let newResponsible = false;
        if (
          (pqrsdf?.response?.responseTypeId == 1 || pqrsdf?.response?.responseTypeId == 2) &&
          pqrsdf.response?.assignedUserId
        ) {
          pqrsdf.responsibleId = assignedUserEntity?.id;
          updatePqrsdfFields.push("responsibleId");
          pqrsdf.statusId = assignedUserEntity?.workEntityType.associatedStatusId;
          if (!lastResponse) {
            newResponsible = true;
          }
        }

        const isClose = pqrsdf?.response?.responseTypeId == 5 || pqrsdf?.response?.responseTypeId == 4;

        if (isClose) {
          pqrsdf.statusId = 3;
        }

        if (pqrsdf.response?.isPetitioner) {
          updatePqrsdfFields.push("exitFilingNumber");
          if (pqrsdf.person?.email) {
            const satisfactionUrl = await LpaListaParametro.find(3);
            await this.EmailService.sendEmail(
              [pqrsdf.person.email],
              "Solicitud cerrada PQRSDF " + pqrsdf.filingNumber,
              `En atención a la solicitud con radicado ${
                pqrsdf.filingNumber
              }, la Agencia de Educación Postsecundaria de Medellín - Sapiencia, emite comunicación a través de radicado de respuesta N° ${
                pqrsdf.exitFilingNumber
              }.<br>
              Tu opinión es muy importante para continuar con el mejoramiento del servicio, por favor diligencia la encuesta de satisfacción.
                ${satisfactionUrl ? `<a href="${satisfactionUrl?.lpa_valor}" target="_blank">Clic Aquí</a>` : ""}`,
              [
                ...supportFiles.map((sfile) => {
                  return sfile.tmpPath + "." + sfile.extname;
                }),
                file?.tmpPath + "." + file.extname,
              ]
            );
          }
        }

        if (newResponsible && assignedUserEntity && !isClose) {
          let assignedUser = (await this.AuthExternalService.getUserById(assignedUserEntity.userId)).data;
          if (assignedUser?.email) {
            await this.EmailService.sendEmail(
              [assignedUser.email],
              "Asignación de PQRSDF " + pqrsdf.filingNumber,
              `Se le informa que la PQRSDF ${pqrsdf.filingNumber} le ha sido asignada para su gestión, por favor verifique su bandeja.`
            );
          }
        }

        if (pqrsdf?.response?.responseTypeId == 3) {
          updatePqrsdfFields.push("extensionDate");
          if (pqrsdf.person?.email) {
            await this.EmailService.sendEmail(
              [pqrsdf.person.email],
              `Respuesta a radicado ${pqrsdf.filingNumber}`,
              `Se le informa que la PQRSDF ${
                pqrsdf.filingNumber
              } para poder darle una respuesta de fondo, la entidad solicita prórroga por ${
                pqrsdf.requestSubject?.requestObject?.obs_termino_dias ?? 10
              } días más.`,
              [
                ...supportFiles.map((sfile) => {
                  return sfile.tmpPath + "." + sfile.extname;
                }),
                file?.tmpPath + "." + file.extname,
              ]
            );
          }
        }

        if (!pqrsdf?.response?.assignedUserId) {
          delete pqrsdf.response.assignedUserId;
          delete pqrsdf.response.assignedUserId;
        }

        await PqrsdfResponse.create(pqrsdf?.response);
        if (pqrsdf?.statusId) {
          updatePqrsdfFields.push("statusId");
        }
        res = await this.updatePqrsdf(pqrsdf, updatePqrsdfFields, newSupportFiles);
      }
    });
    return res?.id ? res : null;
  }

  private async uploadBucket(file: MultipartFileContract) {
    let upload = false;
    let filePath = "";
    let tmpPath = "";
    const bucket = this.storage.bucket(bucketName);
    if (file?.tmpPath) {
      const tempDate = DateTime.now().setZone("America/Bogota").toFormat("yyyy_MM_dd_HH_mm_ss");
      const [fileCloud] = await bucket.upload(file.tmpPath, {
        destination: `${"proyectos-digitales/"}${tempDate + "_" + file.clientName}`,
      });

      if (fileCloud.metadata.id) {
        filePath = fileCloud.metadata.id;
        upload = true;
        tmpPath = file?.tmpPath;
      }
    }

    return {
      filePath: filePath,
      upload: upload,
      tmpPath: tmpPath,
    };
  }

  async deleteFile(filePath: string) {
    // Deletes the file from the bucket
    try {
      await this.storage.bucket(bucketName).file(filePath).delete();
      console.log(`gs://${bucketName}/${filePath} deleted.`);
    } catch (error) {
      console.log(error);
    }
  }

  async createPqrsdf(pqrsdf: IPqrsdf, file: MultipartFileContract, filedNumber: number): Promise<IPqrsdf | null> {
    let res: any;

    await Database.transaction(async (trx) => {
      if (pqrsdf?.person) {
        const existPerson = pqrsdf.person.identification
          ? await Person.query().where("identification", pqrsdf.person.identification).first()
          : null;
        if (!pqrsdf?.person?.departmentId) {
          delete pqrsdf?.person?.departmentId;
        }
        if (!pqrsdf?.person?.municipalityId) {
          delete pqrsdf?.person?.municipalityId;
        }
        if (!pqrsdf?.person?.firstName) {
          delete pqrsdf?.person?.firstName;
          delete pqrsdf?.person?.secondName;
          delete pqrsdf?.person?.firstSurname;
          delete pqrsdf?.person?.secondSurname;
        }
        if (existPerson) {
          await this.updatePerson(pqrsdf?.person);
        }
        const newPerson = existPerson
          ? await existPerson.useTransaction(trx).refresh()
          : (await Person.create(pqrsdf.person)).useTransaction(trx);

        //TODO UPLOAD
        let upload = false;
        if (file) {
          const responseFile = await this.uploadBucket(file);
          upload = responseFile.upload;
          pqrsdf.file = {
            isActive: true,
            name: responseFile.filePath,
          };
        }

        const newFile = pqrsdf?.file && upload ? (await File.create(pqrsdf?.file)).useTransaction(trx) : null;
        if (newFile) {
          pqrsdf.fileId = newFile.id;
        } else {
          delete pqrsdf.fileId;
        }
        const responsible = await this.getResponsible(pqrsdf.requestSubjectId);
        pqrsdf.responsibleId = responsible?.id ?? 1;
        pqrsdf.filingNumber = filedNumber;
        pqrsdf.statusId = responsible?.workEntityType?.associatedStatusId;

        const newPqrsdf = await newPerson.related("pqrsdfs").create(pqrsdf);
        res = await this.formatPqrsdf(newPqrsdf);

        //TODO EMAIL
        if (pqrsdf.person?.email) {
          const queryPqrsdfUrl = await LpaListaParametro.find(2);
          await this.EmailService.sendEmail(
            [pqrsdf.person.email],
            `Radicación de PQRSDF con número ${pqrsdf.filingNumber} en Sapiencia `,
            `Gracias por comunicarse con SAPIENCIA la agencia de educación Postsecundaria de Medellín.<br>
            Le informamos que su solicitud ha sido radicada exitosamente con el número ${
              pqrsdf.filingNumber
            }, puede realizar seguimiento a través de
            ${
              queryPqrsdfUrl
                ? `<a href="${queryPqrsdfUrl?.lpa_valor}" target="_blank">${queryPqrsdfUrl?.lpa_descripcion}</a>`
                : ""
            }`
          );
        }
      }
    });
    return res?.id ? res : null;
  }

  getBase64Encode(b64: string) {
    const signatures = {
      JVBERi0: "application/pdf",
      R0lGODdh: "image/gif",
      R0lGODlh: "image/gif",
      iVBORw0KGgo: "image/png",
      "/9j/": "image/jpg",
    };
    for (let s in signatures) {
      if (b64.startsWith(s)) {
        return signatures[s];
      }
    }
  }

  async getFile(filePath: string) {
    try {
      let path = filePath.replace(bucketName + "/", "").split("/");
      if (path.length > 1) {
        path.pop();
      }
      const _this = this;
      await this.storage
        .bucket(bucketName)
        .file(path.join("/"))
        .download()
        .then(function (data) {
          filePath = data[0].toString("base64");
          filePath = `data:${_this.getBase64Encode(filePath)};base64,${filePath}`;
        });
    } catch (error) {
      return "";
    }
    return filePath;
  }

  async getPeopleByFilters(filters: IPersonFilters): Promise<IPagingData<IPerson | null>> {
    const query = Person.query();
    let isFiltered: boolean = false;
    if (filters?.documentTypeId) {
      query.where("documentTypeId", filters?.documentTypeId);
      isFiltered = true;
    }
    if (filters?.name) {
      query.whereRaw(`CONCAT(PER_PRIMER_NOMBRE, " ", PER_SEGUNDO_NOMBRE) like "%${filters.name}%"`);
      isFiltered = true;
    }
    if (filters?.surname) {
      query.whereRaw(`CONCAT(PER_PRIMER_APELLIDO, " ", PER_SEGUNDO_APELLIDO) like "%${filters.surname}%"`);
      isFiltered = true;
    }
    if (filters?.identification) {
      query.where("identification", filters.identification);
      isFiltered = true;
    }
    if (filters?.email) {
      query.whereILike("email", `%${filters.email}`);
      isFiltered = true;
    }
    if (filters?.contactNumber) {
      query
        .whereILike("firstContactNumber", `%${filters.contactNumber}%`)
        .orWhereILike("secondContactNumber", `%${filters.contactNumber}%`);
      isFiltered = true;
    }

    if (!isFiltered) {
      return {
        array: [],
        meta: {
          total: 0,
        },
      };
    }
    const peoplePagination = await query.orderBy("id", "desc").paginate(filters?.page ?? 1, filters?.perPage ?? 10);
    const { meta } = peoplePagination.serialize();
    let serializePeople: IPerson[] = [];

    for await (const person of peoplePagination.all()) {
      let serializePerson = await this.formatPerson(person);
      if (serializePerson) {
        serializePeople.push(serializePerson);
      }
    }
    return {
      array: serializePeople,
      meta,
    };
  }

  async getResponsibleByUserId(userId: number): Promise<WorkEntity | null> {
    return WorkEntity.query()
      .where("status", 1)
      .where("userId", userId)
      .preload("workEntityType", (workEntityType) => {
        workEntityType.preload("dependence");
        workEntityType.preload("status");
      })
      .first();
  }

  async getResponsible(affair: number): Promise<WorkEntity | null> {
    const responsibles = await WorkEntity.query()
      .where("status", 1)
      .whereHas("affairsPrograms", (query) => {
        query.whereHas("affairsProgram", (q) => {
          q.where("PRA_CODASO_ASUNTO_SOLICITUD", affair);
        });
      })
      .preload("pqrsdfs")
      .preload("workEntityType", (workEntityType) => {
        workEntityType.preload("dependence");
        workEntityType.preload("status");
      });
    let max = 0;
    let finalResponsible: any;
    responsibles.forEach((responsible) => {
      if (!finalResponsible?.id) {
        finalResponsible = responsible;
        max = responsible.pqrsdfs.length;
      }
      if (responsible.pqrsdfs.length <= max) {
        finalResponsible = responsible;
      }
    });
    return finalResponsible;
  }

  async getPqrsdfById(id: number): Promise<IPqrsdf | null> {
    const pqrsdf = await Pqrsdf.find(id);
    if (pqrsdf) {
      await pqrsdf.load("program", (progam) => {
        progam.preload("clpClasificacionPrograma");
        progam.preload("depDependencia");
      });
    }
    let serializePqrsdf: IPqrsdf | null = await this.formatPqrsdf(pqrsdf);

    return serializePqrsdf?.id ? serializePqrsdf : null;
  }

  private async formatPerson(person: Person | null): Promise<IPerson | null> {
    let serializePerson: any = null;
    if (person) {
      await person.load("entityType");

      serializePerson = person.serialize() as IPerson;

      const municipalities = await this.GenericListsExternalService.getItemsByGrouper(EGrouperCodes.MUNICIPALITIES);
      const documentTypes = await this.GenericListsExternalService.getItemsByGrouper(EGrouperCodes.DOCUMENT_TYPES);
      const departments = await this.GenericListsExternalService.getItemsByGrouper(EGrouperCodes.DEPARTMENTS);
      const countries = await this.GenericListsExternalService.getItemsByGrouper(EGrouperCodes.COUNTRIES);

      serializePerson.documentType = documentTypes.data.find(
        (documentType) => documentType.id == serializePerson?.documentTypeId
      );
      serializePerson.department = departments.data.find(
        (department) => department.id == serializePerson?.departmentId
      );
      serializePerson.municipality = municipalities.data.find(
        (municipality) => municipality.id == serializePerson?.municipalityId
      );
      serializePerson.country = countries.data.find((country) => country.id == serializePerson?.countryId);
    }
    return serializePerson;
  }

  private async formatPqrsdf(pqrsdf: Pqrsdf | null, user: IUser | null = null): Promise<IPqrsdf | null> {
    let serializePqrsdf: any = null;
    if (pqrsdf) {
      await pqrsdf.load("person", (person) => {
        person.preload("entityType");
      });
      if (pqrsdf.responsibleId) {
        await pqrsdf.load("responsible", (responsible) => {
          responsible.preload("workEntityType", (workEntityType) => {
            workEntityType.preload("dependence");
          });
        });
      }
      await pqrsdf.load("status");
      await pqrsdf.load("pqrsdfResponses",(response) => {
        response.preload("file");
      });
      await pqrsdf.load("requestSubject", (requestSubject) => {
        requestSubject.preload("requestObject");
      });
      if (pqrsdf?.fileId) {
        await pqrsdf.load("file");
      }
      await pqrsdf.load("supportFiles");
      await pqrsdf.load("requestType");
      await pqrsdf.load("responseMedium");

      const municipalities = await this.GenericListsExternalService.getItemsByGrouper(EGrouperCodes.MUNICIPALITIES);
      const documentTypes = await this.GenericListsExternalService.getItemsByGrouper(EGrouperCodes.DOCUMENT_TYPES);
      const departments = await this.GenericListsExternalService.getItemsByGrouper(EGrouperCodes.DEPARTMENTS);
      const countries = await this.GenericListsExternalService.getItemsByGrouper(EGrouperCodes.COUNTRIES);

      if (!user) {
        user = (await this.AuthExternalService.getUserById(pqrsdf.responsible.userId)).data;
      }

      serializePqrsdf = pqrsdf.serialize() as IPqrsdf;
      if (pqrsdf?.fileId && pqrsdf.file) {
        serializePqrsdf.file.filePath = await this.getFile(pqrsdf.file.name);
      }
      if (pqrsdf?.supportFiles?.length) {
        for (let index = 0; index < serializePqrsdf.supportFiles.length; index++) {
          serializePqrsdf.supportFiles[index] = await this.getFile(pqrsdf.supportFiles[index].name);
        }
      }
      serializePqrsdf.responsible.user = user;
      if (serializePqrsdf.person) {
        serializePqrsdf.person.documentType = documentTypes.data.find(
          (documentType) => documentType.id == serializePqrsdf.person?.documentTypeId
        );
        serializePqrsdf.person.department = departments.data.find(
          (department) => department.id == serializePqrsdf.person?.departmentId
        );
        serializePqrsdf.person.municipality = municipalities.data.find(
          (municipality) => municipality.id == serializePqrsdf.person?.municipalityId
        );
        serializePqrsdf.person.country = countries.data.find(
          (country) => country.id == serializePqrsdf.person?.countryId
        );
      }
    }
    return serializePqrsdf;
  }

  async getPersonByDocument(identification: number): Promise<IPerson | null> {
    const person = await Person.query().where("identification", identification).firstOrFail();

    return person?.id ? await this.formatPerson(person) : null;
  }

  async updatePerson(personData: IPerson): Promise<IPerson | null> {
    const person = await Person.query().where("identification", personData.identification).firstOrFail();
    if (person) {
      if (!personData?.departmentId) {
        delete personData?.departmentId;
      }
      if (!personData?.municipalityId) {
        delete personData?.municipalityId;
      }
      if (!personData?.firstName) {
        delete personData?.firstName;
        delete personData?.secondName;
        delete personData?.firstSurname;
        delete personData?.secondSurname;
      }
      delete personData.documentType;
      if (personData?.birthdate) {
        personData.birthdate = new Date(personData.birthdate);
      }
      await person.merge(personData).save();
    }

    return person?.id ? await this.formatPerson(person) : null;
  }

  async getPqrsdfByIdentificationAndFilingNumber(
    identification: number,
    filingNumber: number
  ): Promise<IPqrsdf | null> {
    const pqrsdf = await Pqrsdf.query()
      .where("filingNumber", filingNumber)
      .whereHas("person", (person) => {
        person.where("identification", identification);
      })
      .first();
    let serializePqrsdf: IPqrsdf | null = await this.formatPqrsdf(pqrsdf);

    return serializePqrsdf?.id ? serializePqrsdf : null;
  }

  async getPqrsdfs(): Promise<[] | IPqrsdf[]> {
    return [];
  }

  async updatePqrsdf(
    pqrsdf: IPqrsdf,
    fields: string[] = ["requestTypeId", "responseMediumId", "programId", "requestSubjectId"],
    newSupportFiles: File[] = []
  ): Promise<IPqrsdf | null> {
    const pqrsdfToUpdate = await Pqrsdf.find(pqrsdf.id);
    let formattedPqrsdf = pqrsdf;
    if (pqrsdfToUpdate) {
      fields.forEach((field) => {
        if (pqrsdf[field]) {
          pqrsdfToUpdate[field] = pqrsdf[field];
        }
      });
      await pqrsdfToUpdate.save();
      if (newSupportFiles.length) {
        await pqrsdfToUpdate.related("supportFiles").attach(
          newSupportFiles.map((supportFile) => {
            return supportFile.id;
          })
        );
      }
      const newPqrsdfData = await this.formatPqrsdf(pqrsdfToUpdate);
      formattedPqrsdf = newPqrsdfData ?? pqrsdf;
      formattedPqrsdf.response = pqrsdf.response;
    }
    return formattedPqrsdf;
  }

  async uploadFile(file: MultipartFileContract): Promise<boolean> {
    try {
      const bucket = this.storage.bucket(bucketName);
      if (!file.tmpPath) return false;
      const tempDate = DateTime.now().toFormat("yyyy_MM_dd_HH_mm_ss");
      const [fileCloud] = await bucket.upload(file.tmpPath, {
        destination: `${"proyectos-digitales/"}${tempDate + "_" + file.clientName}`,
      });

      return !!fileCloud;
    } catch (error) {
      return false;
    }
  }

  async getPqrsdfByRequest(filters: IrequestPqrsdf): Promise<IPqrsdf[]> {
    const { userId, typeReques } = filters;

    let res: any;

    try {
      if (userId && typeReques !== 3) {
        const query = Pqrsdf.query()
          .preload("person", (person) => {
            person.preload("entityType");
          })
          .preload("responsible", (responsible) => {
            responsible.preload("workEntityType", (workEntityType) => {
              workEntityType.preload("dependence");
            });
          })
          .preload("status")
          .preload("reopenRequest")
          .preload("canalesAttencion")
          .preload("requestSubject", (requestSubject) => {
            requestSubject.preload("requestObject");
          })
          .preload("responseMedium")
          .preload("requestType")
          .preload("program")
          .whereHas("responsible", (responsible) => {
            responsible.where("userId", userId);
          });
        if (typeReques != 3) {
          query.whereNot("statusId", 3);
        } else {
          query.where("statusId", 3);
        }
        res = await query;
      }
    } catch (error) {}

    return res;
  }

  async formatResponses(pqrsdfResponses: PqrsdfResponse[]): Promise<IPqrsdfResponse[]> {
    let pqrsdfResponsesFormatted: IPqrsdfResponse[] = [];
    let ids = [
      ...new Set([
        ...pqrsdfResponses.map((response) => response.assignedUserId),
        ...pqrsdfResponses.map((response) => response.respondingUserId),
      ]),
    ];
    let users: IUser[] = [];
    if (!users.length) {
      users = (await this.AuthExternalService.getUsersByIds(ids)).data;
    }
    for await (const pqrsdfResponse of pqrsdfResponses) {
      let pqrsdfResponseFormatted: IPqrsdfResponse = await this.formatResponse(pqrsdfResponse, users);
      pqrsdfResponsesFormatted.push(pqrsdfResponseFormatted);
    }
    return pqrsdfResponsesFormatted;
  }

  async formatResponse(pqrsdfResponse: PqrsdfResponse, users: IUser[]): Promise<IPqrsdfResponse> {
    if (pqrsdfResponse?.assignedDependenceId) {
      await pqrsdfResponse.load("assignedDependence");
    }
    if (pqrsdfResponse?.workEntityId) {
      await pqrsdfResponse.load("workEntity");
    }
    if (pqrsdfResponse?.respondingDependenceId) {
      await pqrsdfResponse.load("respondingDependence");
    }
    if (pqrsdfResponse?.factorId) {
      await pqrsdfResponse.load("factor");
    }
    if (pqrsdfResponse?.fileId) {
      await pqrsdfResponse.load("file");
    }
    await pqrsdfResponse.load("responseType");
    await pqrsdfResponse.load("pqrsdf", (pqrsdf) => {
      pqrsdf.preload("status");
    });

    let pqrsdfResponseFormatted = pqrsdfResponse.serialize() as IPqrsdfResponse;
    if (pqrsdfResponse?.fileId && pqrsdfResponse.file && pqrsdfResponseFormatted?.file) {
      pqrsdfResponseFormatted.file.filePath = await this.getFile(pqrsdfResponse.file.name);
    }
    if (pqrsdfResponseFormatted.assignedUserId) {
      pqrsdfResponseFormatted.assignedUser = users.filter(
        (user) => user.id == pqrsdfResponseFormatted.assignedUserId
      )[0];
    }
    if (pqrsdfResponseFormatted.respondingUserId) {
      pqrsdfResponseFormatted.respondingUser = users.filter(
        (user) => user.id == pqrsdfResponseFormatted.respondingUserId
      )[0];
    }

    return pqrsdfResponseFormatted;
  }

  async getPqrsdfResponnses(filters: IResponseFilters): Promise<IPagingData<IPqrsdfResponse | null>> {
    if (!filters?.pqrsdfId) {
      return {
        array: [],
        meta: {
          total: 0,
        },
      };
    }
    const responsePagination = await PqrsdfResponse.query()
      .where("pqrsdfId", filters.pqrsdfId)
      .orderBy("createdAt", "asc")
      .paginate(filters?.page ?? 1, filters?.perPage ?? 10);

    const { meta } = responsePagination.serialize();
    let serializeResponses = await this.formatResponses(responsePagination.all());

    return {
      array: serializeResponses,
      meta,
    };
  }

  async createRequestReopen(justification: IReopenRequest): Promise<IReopenRequest | null> {
    let res: any;
    await Database.transaction(async (trx) => {
      // Crea una nueva solicitud de reapertura
      const solicitudReabrir = await SrbSolicitudReabrir.create(justification[0], trx);

      // Actualiza el campo 'PQR_CODSRB_SRB_SOLICITU_REABRIR' en la tabla 'Pqrsdf'
      await Pqrsdf.query(trx)
        .where("PQR_CODIGO", justification[1].pqrsdfId)
        .update("PQR_CODSRB_SRB_SOLICITU_REABRIR", solicitudReabrir.srb_codigo);

      res = solicitudReabrir;
    });

    return res?.sbr_estado ? res : null;
  }
}
