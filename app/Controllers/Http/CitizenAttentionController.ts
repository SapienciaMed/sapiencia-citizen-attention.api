import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CitizenAttentionProvider from "@ioc:core.CitizenAttentionProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ICitizenAttentionFilters } from "App/Interfaces/CitizenAttentionInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";
import jwt from "jsonwebtoken";
import Env from "@ioc:Adonis/Core/Env";

export default class CitizenAttentionController {
  public async getCitizenAttentionById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await CitizenAttentionProvider.getCitizenAttentionById(id));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getCitizenAttentionByFilters({ request, response }: HttpContextContract) {
    const id = this.getUser(request);
    try {
      const filters = request.body() as ICitizenAttentionFilters;
      filters.userId = id;
      return response.send(await CitizenAttentionProvider.getCitizenAttentionByFilters(filters));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getAttentionRequestTypes({ response }: HttpContextContract) {
    try {
      return response.send(await CitizenAttentionProvider.getAttentionRequestTypes());
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getStratums({ response }: HttpContextContract) {
    try {
      return response.send(await CitizenAttentionProvider.getStratums());
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getCountries({ response }: HttpContextContract) {
    try {
      return response.send(await CitizenAttentionProvider.getCountries());
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getDepartments({ request, response }: HttpContextContract) {
    try {
      const { countryId } = request.qs();
      return response.send(await CitizenAttentionProvider.getDepartments(countryId));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getMunicipalities({ response, request }: HttpContextContract) {
    try {
      const { departmentId } = request.qs();
      return response.send(await CitizenAttentionProvider.getMunicipalities(departmentId));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getCorregimientos({ response }: HttpContextContract) {
    try {
      return response.send(await CitizenAttentionProvider.getCorregimientos());
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getDependencies({ response }: HttpContextContract) {
    try {
      return response.send(await CitizenAttentionProvider.getDependencies());
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getPrograms({ response }: HttpContextContract) {
    try {
      return response.send(await CitizenAttentionProvider.getPrograms());
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getResponseMediums({ response }: HttpContextContract) {
    try {
      return response.send(await CitizenAttentionProvider.getResponseMediums());
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getResponseTypes({ response }: HttpContextContract) {
    try {
      return response.send(await CitizenAttentionProvider.getResponseTypes());
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getRequestTypes({ response }: HttpContextContract) {
    try {
      return response.send(await CitizenAttentionProvider.getRequestTypes());
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getLegalEntityTypes({ response }: HttpContextContract) {
    try {
      return response.send(await CitizenAttentionProvider.getLegalEntityTypes());
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getRequestSubjectTypes({ response }: HttpContextContract) {
    try {
      return response.send(await CitizenAttentionProvider.getRequestSubjectTypes());
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getSeviceChannels({ response }: HttpContextContract) {
    try {
      return response.send(await CitizenAttentionProvider.getSeviceChannels());
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getValueGroups({ response }: HttpContextContract) {
    try {
      return response.send(await CitizenAttentionProvider.getValueGroups());
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  private getUser(request) {
    const req = request.headers();
    const key = Env.get("APP_KEY");

    const token = req.authorization?.replace("Bearer ", "");

    const { id } = jwt.verify(token!, key) as { id: number; document: string };

    return id;
  }

  public async createCitizenAttention({ request, response }: HttpContextContract) {
    const id = this.getUser(request);
    try {
      const { citizenAttention } = request.body();
      citizenAttention.userId = id;
      return response.send(await CitizenAttentionProvider.createCitizenAttention(citizenAttention));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async updateCitizenAttention({ request, response }: HttpContextContract) {
    try {
      const { citizenAttention } = request.body();
      return response.send(await CitizenAttentionProvider.updateCitizenAttention(citizenAttention));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getProgramByUser(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;

    let payload = request.body()

    try {
        const res = await CitizenAttentionProvider.getProgramByUser(payload)
        return response.ok(res)
    } catch (err) {
        logger.error(err);
        const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
        return response.badRequest(apiResp);
    }
}
public async getSubjectByUser(ctx: HttpContextContract) {
    const { request, response, logger } = ctx;

    let payload = request.body()

    try {
        const res = await CitizenAttentionProvider.getSubjectByUser(payload)
        return response.ok(res)
    } catch (err) {
        logger.error(err);
        const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
        return response.badRequest(apiResp);
    }
}
}
