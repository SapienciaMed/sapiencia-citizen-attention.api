import { DateTime } from "luxon";
import { IDaysParametrizationDetail } from "./DaysParametrizationDetailInterfaces";

export interface IDaysParametrization {
  id: number;
  year: number;
  daysParametrizationDetails: IDaysParametrizationDetail[];
  createdAt: DateTime;
  updatedAt: DateTime;
}
