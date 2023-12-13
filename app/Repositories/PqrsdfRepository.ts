import { Storage } from "@google-cloud/storage";
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import Database from "@ioc:Adonis/Lucid/Database";
import { EGrouperCodes } from "App/Constants/GrouperCodesEnum";
import { IPerson, IPersonFilters } from "App/Interfaces/PersonInterfaces";
import {
  IPqrsdf,
  IPqrsdfFilters,
  IpqrsdfByRequest,
  IrequestPqrsdf,
  IrequestReopen,
} from "App/Interfaces/PqrsdfInterfaces";
import File from "App/Models/File";
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
import LpaListaParametro from "App/Models/LpaListaParametro";

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

  async getPqrsdfPaginated(filters: IPqrsdfFilters): Promise<IPagingData<IPqrsdf>> {
    const query = Pqrsdf.query()
      .preload("person")
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
      query.where("filingNumber", filters.filingNumber);
    }

    if (filters?.programId) {
      query.where("programId", filters.programId);
    }

    if (filters?.requestType) {
      query.whereHas("requestSubject", (sub) => sub.where("ASO_CODIGO", String(filters.requestType)));
    }

    const res = await query.paginate(filters.page, filters.perPage);
    const { data, meta } = res.serialize();

    return {
      array: data as IPqrsdf[],
      meta,
    };
  }

  async createResponse(
    pqrsdf: IPqrsdf,
    file: MultipartFileContract
    // supportFiles: MultipartFileContract[] = []
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
        const newFile =
          pqrsdf?.response?.file && uploadResponseFile
            ? (await File.create(pqrsdf?.response?.file)).useTransaction(trx)
            : null;
        if (newFile) {
          pqrsdf.response.fileId = newFile.id;
        }

        if (pqrsdf.motiveId) {
          updatePqrsdfFields.push("motiveId");
        }

        const respondingUserEntity = await this.getResponsibleByUserId(pqrsdf.response.respondingUserId);
        pqrsdf.response.respondingDependenceId = respondingUserEntity?.workEntityType.dependenceId;
        pqrsdf.response.WorkEntityId = respondingUserEntity?.id;
        //set assignedUser response data
        pqrsdf.response.assignedUserId = lastResponse ? lastResponse.assignedUserId : pqrsdf.response?.assignedUserId;
        let assignedUserEntity: WorkEntity | null = null;
        if (pqrsdf.response?.assignedUserId) {
          assignedUserEntity = lastResponse ? null : await this.getResponsibleByUserId(pqrsdf.response.assignedUserId);
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
          pqrsdf.responsibleId = respondingUserEntity?.id;
          pqrsdf.statusId = respondingUserEntity?.workEntityType.associatedStatusId;
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
              `En atención a la solicitud con radicado ${pqrsdf.filingNumber}, la Agencia de Educación Postsecundaria de Medellín - Sapiencia, emite comunicación a través de radicado de respuesta N° ${pqrsdf.exitFilingNumber}.<br>` +
                `Tu opinión es muy importante para continuar con el mejoramiento del servicio, por favor diligencia la encuesta de satisfacción.` +
                satisfactionUrl
                ? `<a href="${satisfactionUrl?.lpa_valor}" target="_blank">Clic Aquí</a>`
                : "",
              file?.tmpPath
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
              "Respuesta a radicado " + pqrsdf.filingNumber,
              `Se le informa que la PQRSDF ${
                pqrsdf.filingNumber
              } para poder darle una respuesta de fondo, la entidad solicita prórroga por ${
                pqrsdf.requestSubject?.requestObject?.obs_termino_dias ?? 10
              } días más.`,
              file?.tmpPath
            );
          }
        }

        await PqrsdfResponse.create(pqrsdf?.response);

        res = await this.updatePqrsdf(pqrsdf, updatePqrsdfFields);
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
      const tempDate = DateTime.now().toFormat("YYYY_MM_DD_HH_mm_ss");
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

  async createPqrsdf(pqrsdf: IPqrsdf, file: MultipartFileContract, filedNumber: number): Promise<IPqrsdf | null> {
    let res: any;

    await Database.transaction(async (trx) => {
      if (pqrsdf?.person) {
        const existPerson = await Person.query().where("identification", pqrsdf.person.identification).first();
        if (existPerson) {
          await this.updatePerson(pqrsdf?.person);
        }
        const newPerson = existPerson
          ? await existPerson.useTransaction(trx).refresh()
          : (await Person.create(pqrsdf.person)).useTransaction(trx);

        //TODO UPLOAD
        let upload = false;
        if (file) {
          const bucket = this.storage.bucket(bucketName);
          if (!file.tmpPath) return false;
          const tempDate = DateTime.now().toFormat("YYYY_MM_DD_HH_mm_ss");
          const [fileCloud] = await bucket.upload(file.tmpPath, {
            destination: `${"proyectos-digitales/"}${tempDate + "_" + file.clientName}`,
          });

          if (fileCloud.metadata.id) {
            pqrsdf.file.name = fileCloud.metadata.id;
            upload = true;
          }
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
      }
    });
    return res?.id ? res : null;
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

  private async formatPqrsdf(pqrsdf: Pqrsdf | null): Promise<IPqrsdf | null> {
    let serializePqrsdf: any = null;
    if (pqrsdf) {
      await pqrsdf.load("person", (person) => {
        person.preload("entityType");
      });
      await pqrsdf.load("responsible");
      await pqrsdf.load("status");
      await pqrsdf.load("pqrsdfResponses");
      await pqrsdf.load("requestSubject", (requestSubject) => {
        requestSubject.preload("requestObject");
      });
      if (pqrsdf?.fileId) {
        await pqrsdf.load("file");
      }
      await pqrsdf.load("requestType");
      await pqrsdf.load("responseMedium");

      const municipalities = await this.GenericListsExternalService.getItemsByGrouper(EGrouperCodes.MUNICIPALITIES);
      const documentTypes = await this.GenericListsExternalService.getItemsByGrouper(EGrouperCodes.DOCUMENT_TYPES);
      const departments = await this.GenericListsExternalService.getItemsByGrouper(EGrouperCodes.DEPARTMENTS);
      const countries = await this.GenericListsExternalService.getItemsByGrouper(EGrouperCodes.COUNTRIES);

      serializePqrsdf = pqrsdf.serialize() as IPqrsdf;
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
    fields: string[] = ["requestTypeId", "responseMediumId", "programId", "requestSubjectId"]
  ): Promise<IPqrsdf | null> {
    const pqrsdfToUpdate = await Pqrsdf.find(pqrsdf.id);
    let formattedPqrsdf = pqrsdf;
    if (pqrsdfToUpdate) {
      fields.forEach((field) => {
        pqrsdfToUpdate[field] = pqrsdf[field];
      });
      await pqrsdfToUpdate.save();
      const newPqrsdfData = await this.formatPqrsdf(pqrsdfToUpdate);
      formattedPqrsdf = newPqrsdfData ? newPqrsdfData : pqrsdf;
      formattedPqrsdf.response = pqrsdf.response;
    }
    return formattedPqrsdf;
  }

  async uploadFile(file: MultipartFileContract): Promise<boolean> {
    try {
      const bucket = this.storage.bucket(bucketName);
      if (!file.tmpPath) return false;
      const tempDate = DateTime.now().toFormat("YYYY_MM_DD_HH_mm_ss");
      const [fileCloud] = await bucket.upload(file.tmpPath, {
        destination: `${"proyectos-digitales/"}${tempDate + "_" + file.clientName}`,
      });

      return !!fileCloud;
    } catch (error) {
      return false;
    }
  }

  async getPqrsdfByRequest(filters: IrequestPqrsdf): Promise<null | IpqrsdfByRequest> {
    const { userId, typeReques } = filters;

    let res: any;

    try {
      if (userId && typeReques !== 3) {
        const query = Database.from("PQR_PQRSDF")
          .join("ENT_ENTIDAD_TRABAJO", " PQR_PQRSDF.PQR_CODENT_ENTIDAD_TRABAJO", "ENT_ENTIDAD_TRABAJO.ENT_CODIGO")
          .join("PER_PERSONAS", " PQR_PQRSDF.PQR_CODPER_PERSONA", "PER_PERSONAS.PER_CODIGO")
          .join("ASO_ASUNTO_SOLICITUD", " PQR_PQRSDF.PQR_CODTSO_TIPO_SOLICITUD", "ASO_ASUNTO_SOLICITUD.ASO_CODIGO")
          .join(
            "OBS_OBJECTO_SOLICITUD",
            "ASO_ASUNTO_SOLICITUD.ASO_CODOBS_OBJETO_SOLICITUD",
            "OBS_OBJECTO_SOLICITUD.OBS_CODIGO"
          )
          .join(
            "LEP_LISTADO_ESTADO_PQRSDF",
            "PQR_PQRSDF.PQR_CODLEP_LISTADO_ESTADO_PQRSDF",
            "LEP_LISTADO_ESTADO_PQRSDF.LEP_CODIGO"
          )
          .join("PRG_PROGRAMAS", " PQR_PQRSDF.PQR_CODPRG_PROGRAMA", "PRG_PROGRAMAS.PRG_CODIGO")
          .where("ENT_ENTIDAD_TRABAJO.ENT_CODUSR_USUARIO", userId)
          .where("PQR_CODLEP_LISTADO_ESTADO_PQRSDF", "!=", 3)
          .select(
            "PQR_CODIGO",
            "PQR_NRO_RADICADO",
            "PQR_FECHA_CREACION",
            "PER_NUMERO_DOCUMENTO",
            "PER_PRIMER_NOMBRE",
            "PER_SEGUNDO_NOMBRE",
            "PER_PRIMER_APELLIDO",
            "PER_SEGUNDO_APELLIDO",
            "ASO_ASUNTO",
            "LEP_ESTADO",
            "OBS_TIPO_DIAS",
            "OBS_TERMINO_DIAS",
            "PRG_DESCRIPCION"
          );

        res = await query;
      }

      if (userId && typeReques === 3) {
        const query = Database.from("PQR_PQRSDF")
          .join("ENT_ENTIDAD_TRABAJO", " PQR_PQRSDF.PQR_CODENT_ENTIDAD_TRABAJO", "ENT_ENTIDAD_TRABAJO.ENT_CODIGO")
          .join("PER_PERSONAS", " PQR_PQRSDF.PQR_CODPER_PERSONA", "PER_PERSONAS.PER_CODIGO")
          .join("ASO_ASUNTO_SOLICITUD", " PQR_PQRSDF.PQR_CODTSO_TIPO_SOLICITUD", "ASO_ASUNTO_SOLICITUD.ASO_CODIGO")
          .join(
            "OBS_OBJECTO_SOLICITUD",
            "ASO_ASUNTO_SOLICITUD.ASO_CODOBS_OBJETO_SOLICITUD",
            "OBS_OBJECTO_SOLICITUD.OBS_CODIGO"
          )
          .join(
            "LEP_LISTADO_ESTADO_PQRSDF",
            " PQR_PQRSDF.PQR_CODLEP_LISTADO_ESTADO_PQRSDF",
            "LEP_LISTADO_ESTADO_PQRSDF.LEP_CODIGO"
          )
          .join("PRG_PROGRAMAS", " PQR_PQRSDF.PQR_CODPRG_PROGRAMA", "PRG_PROGRAMAS.PRG_CODIGO")
          .join(
            "SRB_SOLICITUD_REABRIR",
            " PQR_PQRSDF.PQR_CODSRB_SRB_SOLICITU_REABRIR",
            "SRB_SOLICITUD_REABRIR.SRB_CODIGO"
          )
          .where("ENT_ENTIDAD_TRABAJO.ENT_CODUSR_USUARIO", userId)
          .where("PQR_CODLEP_LISTADO_ESTADO_PQRSDF", "=", 3)
          .select(
            "PQR_CODIGO",
            "PQR_NRO_RADICADO",
            "PQR_FECHA_CREACION",
            "PER_NUMERO_DOCUMENTO",
            "PER_PRIMER_NOMBRE",
            "PER_SEGUNDO_NOMBRE",
            "PER_PRIMER_APELLIDO",
            "PER_SEGUNDO_APELLIDO",
            "ASO_ASUNTO",
            "LEP_ESTADO",
            "OBS_TIPO_DIAS",
            "OBS_TERMINO_DIAS",
            "PRG_DESCRIPCION",
            "SBR_ESTADO"
          );

        res = await query;
      }
    } catch (error) {}

    return res;
  }

  async createRequestReopen(justification: IrequestReopen): Promise<IrequestReopen | null> {
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
