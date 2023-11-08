import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class PqrsdfFiltersValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    page: schema.number(),
    perPage: schema.number(),
    identification: schema.string.optional(),
    filingNumber: schema.string.optional(),
    programId: schema.number.optional(),
    requestType: schema.number.optional(),
  });



  public messages: CustomMessages = {};
}
