import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { Resource } from 'apps/home-automation-api/src/rest/enum/resource.enum';
import { HttpStatusCode } from 'axios';

import { IdParam, IdParamUrl } from '../../../enum/id-params.enum';
import { ReadHubDto } from '../dto/read-hub.dto';
import { HubRestService } from '../service/hub-rest.service';

@ApiTags(Resource.HUBS)
@Controller()
export class HubRestController {
  private readonly logger = new HaaLogger(HubRestController.name);

  constructor(private readonly hubRestService: HubRestService) {}

  @Put(`${Resource.HUBS}/${Resource.CONNECTIONS}`)
  @ApiResponse({
    status: HttpStatusCode.Created,
    type: ReadHubDto,
    isArray: true,
  })
  put() {
    this.logger.verbose(``, this.put.name);
    return this.hubRestService.connect();
  }

  @Get(Resource.HUBS)
  @ApiResponse({
    status: HttpStatusCode.Found,
    type: ReadHubDto,
    isArray: true,
  })
  findAll() {
    this.logger.verbose(``, this.findAll.name);
    return this.hubRestService.findAll();
  }

  @Get(`${Resource.HUBS}/${IdParamUrl.HUB_ID}`)
  @ApiResponse({
    status: HttpStatusCode.Found,
    type: ReadHubDto,
    isArray: true,
  })
  find(@Param(IdParam.HUB_ID) hubId: string) {
    this.logger.verbose(`hubId: ${hubId}`, this.find.name);
    return this.hubRestService.find(hubId);
  }

  @Delete(`${Resource.HUBS}`)
  @ApiResponse({
    status: HttpStatusCode.Ok,
    type: undefined,
  })
  deleteAll() {
    this.logger.verbose(``, this.deleteAll.name);
    return this.hubRestService.deleteAll();
  }

  @Delete(`${Resource.HUBS}/${IdParamUrl.HUB_ID}`)
  @ApiResponse({
    status: HttpStatusCode.Ok,
    type: undefined,
  })
  delete(@Param(IdParam.HUB_ID) hubId: string) {
    this.logger.verbose(`hubId: ${hubId}`, this.delete.name);
    return this.hubRestService.delete(hubId);
  }
}
