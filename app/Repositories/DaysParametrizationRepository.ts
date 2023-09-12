import { IDayType } from "App/Interfaces/DayTypeInterfaces";
import { IDaysParametrization } from "App/Interfaces/DaysParametrizationInterfaces";
import DaysParametrizationDetail from "App/Models/DaysParametrizationDetail";
import TdiTipoDia from "App/Models/TdiTipoDia";
import DaysParametrization from "../Models/DaysParametrization";
import { IDaysParametrizationRepository } from "./Contracts/IDaysParametrizationRepository";

export default class DaysParametrizationRepository implements IDaysParametrizationRepository {
  constructor() {}

  async getDaysParametrizationById(id: number): Promise<IDaysParametrization | null> {
    const res = await DaysParametrization.find(id);
    if (res) {
      await res.load("daysParametrizationDetails", (daysParametrizationDetailsQuery) => {
        daysParametrizationDetailsQuery.preload("dayType");
      });
    }
    return res ? (res.serialize() as IDaysParametrization) : null;
  }

  async getDaysParametrizations(): Promise<IDaysParametrization[] | []> {
    const res = await DaysParametrization.query()
      .preload("daysParametrizationDetails", (daysParametrizationDetailsQuery) => {
        daysParametrizationDetailsQuery.preload("dayType");
      })
      .orderBy("year", "desc");
    return res ? res.map((daysParametrization) => daysParametrization.serialize() as IDaysParametrization) : [];
  }

  async getDayTypes(): Promise<IDayType[] | []> {
    const res = await TdiTipoDia.query().orderBy("tdi_orden");
    return res ? res.map((dayType) => dayType.serialize() as IDayType) : [];
  }

  async createDaysParametrization(year: number): Promise<IDaysParametrization | null> {
    const res = await DaysParametrization.create({
      year: year,
    });
    return res ? (res.serialize() as IDaysParametrization) : null;
  }

  async updateDaysParametrization(daysParametrization: IDaysParametrization): Promise<IDaysParametrization | null> {
    const dayParametrization = await DaysParametrization.findOrFail(daysParametrization.id);
    
    let notDeleteIds: number[]= [];
    for await (const daysParametrizationDetail of daysParametrization.daysParametrizationDetails) {
        let newDetail = daysParametrizationDetail?.id ? await DaysParametrizationDetail.find(daysParametrizationDetail?.id) : new DaysParametrizationDetail();
        if (newDetail) {
            newDetail.dayTypeId = daysParametrizationDetail.dayTypeId;
            newDetail.description = daysParametrizationDetail?.description;
            newDetail.detailDate = daysParametrizationDetail.detailDate;
            newDetail.daysParametrizationId = daysParametrization.id;
            await newDetail.save();
            notDeleteIds.push(newDetail.id);
        }
    };
    await dayParametrization.refresh();
    await dayParametrization.load("daysParametrizationDetails", (daysParametrizationDetailsQuery) => {
      daysParametrizationDetailsQuery.preload("dayType");
    });

    let toDelete = dayParametrization.daysParametrizationDetails.filter(dayParametrization =>  !notDeleteIds.includes(dayParametrization.id));
    if (toDelete.length>0) {
        await DaysParametrizationDetail.query().whereIn('id',toDelete.map(dayParametrization => dayParametrization.id)).delete();
        await dayParametrization.refresh();
        await dayParametrization.load("daysParametrizationDetails", (daysParametrizationDetailsQuery) => {
            daysParametrizationDetailsQuery.preload("dayType");
        });
    }
    return dayParametrization ? (dayParametrization.serialize() as IDaysParametrization) : null;
  }
}
