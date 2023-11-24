import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'

export default class extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in a environment specified in Seeder
     */
    if (Seeder.default?.environment && Seeder.default.environment.includes('production') && Application.inProduction) {
      return
    }

    await new Seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../AsoAsuntoSolicitud'))
    await this.runSeeder(await import('../AttentionRequestTypeSeeder'))
    await this.runSeeder(await import('../CnaCanalesAtencion'))
    await this.runSeeder(await import('../CadCanalesAtencionDetalle'))
    await this.runSeeder(await import('../ClpClasificacionPrograma'))
    await this.runSeeder(await import('../DepDependencia'))
    await this.runSeeder(await import('../PrgPrograma'))
    await this.runSeeder(await import('../CorregimientoSeeder'))
    await this.runSeeder(await import('../FactorSeeder'))
    await this.runSeeder(await import('../LepListadoEstadoPqrsdf'))
    await this.runSeeder(await import('../LpaListaParametro'))
    await this.runSeeder(await import('../MreMedioRespuesta'))
    await this.runSeeder(await import('../ObsObjectoSolicitud'))
    await this.runSeeder(await import('../RequestSubjectTypeSeeder'))
    await this.runSeeder(await import('../TdiTipoDia'))
    await this.runSeeder(await import('../TejTipoEntidadJuridica'))
    await this.runSeeder(await import('../TetTipoEntidadTrabajo'))
    await this.runSeeder(await import('../TrafficLightPqrsdfDaySeeder'))
    await this.runSeeder(await import('../ValueGroupSeeder'))
    await this.runSeeder(await import('../TsoTipoSolicitud'))
    await this.runSeeder(await import('../User'))
    await this.runSeeder(await import('../UserTypeSeeder'))
    await this.runSeeder(await import('../AffairsProgramsSeeder'))
  }
}
