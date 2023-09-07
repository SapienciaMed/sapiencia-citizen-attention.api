import { DateTime } from "luxon";
import { IDayType } from "./DayTypeInterfaces";

export interface IDaysParametrizationDetail {
  id: number;
  daysParametrizationId: number;
  dayTypeId: number;
  dayType: IDayType;
  description: string | null;
  detailDate: DateTime;
  createdAt: DateTime;
  updatedAt: DateTime;
}
