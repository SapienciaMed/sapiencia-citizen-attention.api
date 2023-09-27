import { IPqrsdf } from "App/Interfaces/PqrsdfInterfaces";
import { IPqrsdfRepository } from "./Contracts/IPqrsdfRepository";
import { IGenericListsExternalService } from "App/Services/External/Contracts/IGenericListsExternalService";
import Pqrsdf from "App/Models/Pqrsdf";
import { EGrouperCodes } from "App/Constants/GrouperCodesEnum";
import Database from "@ioc:Adonis/Lucid/Database";
import Person from "App/Models/Person";
import File from "App/Models/File";

export default class PqrsdfRepository implements IPqrsdfRepository {
  constructor(private GenericListsExternalService: IGenericListsExternalService) {}
  async createPqrsdf(pqrsdf: IPqrsdf): Promise<IPqrsdf | null> {
    let res: any;
    await Database.transaction(async (trx) => {
      if (pqrsdf?.person) {
        const existPerson = await Person.query().where("identification", pqrsdf.person.identification).first();
        const newPerson = existPerson
          ? existPerson.useTransaction(trx)
          : (await Person.create(pqrsdf.person)).useTransaction(trx);

        //TODO UPLOAD
        let upload = true;
        //pqrsdf.file?.name = rutaResultadoDeUpload;
        const newFile = pqrsdf?.file && upload ? (await File.create(pqrsdf?.file)).useTransaction(trx) : null;
        if (newFile) {
          pqrsdf.fileId = newFile.id;
        }
        const lastFilingNumber = await Pqrsdf.query().orderBy("filingNumber", "desc").first();
        pqrsdf.filingNumber = lastFilingNumber?.filingNumber
          ? lastFilingNumber.filingNumber
          : parseInt(new Date().getFullYear().toString() + "02430001");
        const newPqrsdf = await newPerson.related("pqrsdfs").create(pqrsdf);
        res = await this.formatPqrsdf(newPqrsdf);

        //TODO EMAIL
      }
    });
    return res?.id ? res : null;
  }

  async getPqrsdfById(id: number): Promise<IPqrsdf | null> {
    const pqrsdf = await Pqrsdf.find(id);
    let serializePqrsdf: IPqrsdf | null = await this.formatPqrsdf(pqrsdf);

    return serializePqrsdf?.id ? serializePqrsdf : null;
  }

  private async formatPqrsdf(pqrsdf: Pqrsdf | null): Promise<IPqrsdf | null> {
    let serializePqrsdf: any;
    if (pqrsdf) {
      await pqrsdf.load("person", (person) => {
        person.preload("entityType");
      });
      await pqrsdf.load("requestSubject");
      await pqrsdf.load("file");
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

  async updatePqrsdf(pqrsdf: IPqrsdf): Promise<IPqrsdf | null> {
    return pqrsdf;
  }
}
