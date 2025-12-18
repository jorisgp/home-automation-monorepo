import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { Resource } from 'apps/home-automation-api/src/rest/constants/controller.constants';
import { ReadLightDto } from '../dto/read-light.dto';
import { LightRestService } from '../service/light-rest.service';

@ApiTags(Resource.LIGHTS)
@Controller()
export class LightRestController {
  private readonly logger = new HaaLogger(LightRestController.name);

  constructor(private readonly lightRestService: LightRestService) {}

  @Get(`${Resource.HUBS}/:hubId/${Resource.LIGHTS}`)
  @ApiResponse({ status: HttpStatus.OK, type: ReadLightDto, isArray: true })
  getHubLights() {
    this.logger.verbose(``, this.get.name);
    return this.lightRestService.findAll();
  }

  @Get(`${Resource.LIGHTS}`)
  @ApiResponse({ status: HttpStatus.OK, type: ReadLightDto, isArray: true })
  get() {
    this.logger.verbose(``, this.get.name);
    return this.lightRestService.findAll();
  }

  @Get(`${Resource.LIGHTS}/:id`)
  @ApiResponse({ status: HttpStatus.OK, type: ReadLightDto })
  getOne(@Param('id') id: string) {
    this.logger.verbose(`id: ${id}`, this.getOne.name);
    return this.lightRestService.find(id);
  }
}
