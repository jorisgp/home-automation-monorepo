import { Controller, Get, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { Resource } from 'apps/home-automation-api/src/rest/constants/controller.constants';
import { HttpStatusCode } from 'axios';
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
  getHubs() {
    this.logger.verbose(``, this.getHubs.name);
    return this.hubRestService.find();
  }
}
