import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AsoAsuntoSolicitud from 'App/Models/AsoAsuntoSolicitud';
import BeneficiaryStatus from 'App/Models/BeneficiaryStatus';

export default class extends BaseSeeder {
  public async run() {
    await BeneficiaryStatus.createMany([
      {
        sapienciaId: 3,
        status: "Suspensión temporal",
      },
      {
        sapienciaId: 4,
        status: "Suspensión especial",
      },
      {
        sapienciaId: 5,
        status: "Desertor",
      },
      {
        sapienciaId: 6,
        status: "Finalización",
      },
    ]);

    await AsoAsuntoSolicitud.updateOrCreateMany(
      ["aso_asunto", "aso_orden", "beneficiaryStatusId"],
      [
        {
          aso_asunto: "Suspensiones temporales",
          aso_orden: 2,
          beneficiaryStatusId: 1
        },
        {
          aso_asunto: "Suspensiones especiales",
          aso_orden: 3,
          beneficiaryStatusId: 2
        },
        {
          aso_asunto: "Renuncia a la beca",
          aso_orden: 42,
          beneficiaryStatusId: 3
        },
        {
          aso_asunto: "Solicitud de condonación del crédito",
          aso_orden: 22,
          beneficiaryStatusId: 4
        },
        {
          aso_asunto: "Solicitud paso al cobro",
          aso_orden: 23,
          beneficiaryStatusId: 4
        },
      ]
    )
  }
}
