import Database from "@ioc:Adonis/Lucid/Database";
import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "TET_TIPO_ENTIDAD_TRABAJO";

  public async up() {
    await Database.rawQuery("SET FOREIGN_KEY_CHECKS=0;");
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("TET_ESTADO_ASOCIADO")
        .unsigned()
        .references("LEP_LISTADO_ESTADO_PQRSDF.LEP_CODIGO")
        .comment("llave foranea de la tabla estado pqrsdf(FK_LEP_CODIGO)")
        .defaultTo(1);

      table
        .integer("TET_DEPENDENCIA")
        .unsigned()
        .references("DEP_DEPENDENCIA.DEP_CODIGO")
        .comment("llave foranea de la tabla dependencia(FK)")
        .nullable();
    });
    await Database.rawQuery("SET FOREIGN_KEY_CHECKS=1;");
  }

  public async down() {
    // this.schema.dropTable(this.tableName)
  }
}
