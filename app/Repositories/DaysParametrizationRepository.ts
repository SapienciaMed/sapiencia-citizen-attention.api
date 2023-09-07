import { IDaysParametrization } from "App/Interfaces/DaysParametrizationInterfaces";
import DaysParametrization from "../Models/DaysParametrization";
import { IDaysParametrizationRepository } from "./Contracts/IDaysParametrizationRepository";
import { IDayType } from "App/Interfaces/DayTypeInterfaces";
import TdiTipoDia from "App/Models/TdiTipoDia";

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
}
