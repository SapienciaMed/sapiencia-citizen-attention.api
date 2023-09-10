import { IDayType } from "App/Interfaces/DayTypeInterfaces";
import { IDaysParametrizationDetail } from "App/Interfaces/DaysParametrizationDetailInterfaces";
import { IDaysParametrization } from "App/Interfaces/DaysParametrizationInterfaces";
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
    await dayParametrization.related("daysParametrizationDetails").createMany(
      daysParametrization.daysParametrizationDetails.filter((detail: IDaysParametrizationDetail) => {
        return detail?.id == undefined && detail?.id == null && detail?.id <= 0;
      })
    );
    await dayParametrization.related("daysParametrizationDetails").updateOrCreateMany(
      daysParametrization.daysParametrizationDetails.filter((detail: IDaysParametrizationDetail) => {
        return detail?.id != undefined && detail?.id != null && detail?.id > 0;
      })
    );
    await dayParametrization.refresh();
    await dayParametrization.load("daysParametrizationDetails", (daysParametrizationDetailsQuery) => {
      daysParametrizationDetailsQuery.preload("dayType");
    });
    return dayParametrization ? (dayParametrization.serialize() as IDaysParametrization) : null;
  }
}
