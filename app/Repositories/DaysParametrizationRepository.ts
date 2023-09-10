import { IDaysParametrization } from "App/Interfaces/DaysParametrizationInterfaces";
import DaysParametrization from "../Models/DaysParametrization";
import { IDaysParametrizationRepository } from "./Contracts/IDaysParametrizationRepository";
import { IDayType } from "App/Interfaces/DayTypeInterfaces";
import TdiTipoDia from "App/Models/TdiTipoDia";
import { IDaysParametrizationDetail } from "App/Interfaces/DaysParametrizationDetailInterfaces";

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
    const res = await DaysParametrization.query().preload(
      "daysParametrizationDetails",
      (daysParametrizationDetailsQuery) => {
        daysParametrizationDetailsQuery.preload("dayType");
      }
    ).orderBy('year','desc');
    return res ? res.map((daysParametrization) => daysParametrization.serialize() as IDaysParametrization) : [];
  }

  async getDayTypes(): Promise<IDayType[] | []> {
    const res = await TdiTipoDia.query().orderBy('tdi_orden');
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
    await dayParametrization.related('daysParametrizationDetails').createMany(daysParametrization.daysParametrizationDetails.map((detail) => {
        detail.detailDate = detail.detailDate.toDateString();
        return detail;
    }))
    await dayParametrization.refresh();
    return dayParametrization ? (dayParametrization.serialize() as IDaysParametrization) : null;
  }
}
