import { IBeneficiaryStatus } from "./BeneficiaryStatusInterface";

export interface IAffair {
  aso_codigo?: number;
  aso_asunto?: string;
  aso_activo?: boolean;
  aso_orden?: number;
  beneficiaryStatus?: IBeneficiaryStatus;
  beneficiaryStatusId?: number;
  affairProgramId?: number;
}
