import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PivotQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum'
import { ApiResponse } from 'App/Utils/ApiResponses'

export default class PqrsdfsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
