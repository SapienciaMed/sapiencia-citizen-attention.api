import { IBeneficiaryStatus } from "./BeneficiaryStatusInterface";

export interface IRequestSubject {
  aso_codigo: number;
  aso_asunto: string;
  aso_activo: boolean;
  beneficiaryStatus?: IBeneficiaryStatus;
  beneficiaryStatusId?: number;
  aso_orden: number;
}
