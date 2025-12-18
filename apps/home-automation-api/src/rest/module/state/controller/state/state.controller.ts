import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { Resource } from 'apps/home-automation-api/src/rest/constants/controller.constants';
import { ReadLightStateDto } from '../../dto/read-light-state.dto';
import { UpdateLightStateDto } from '../../dto/update-light-state.dto';
import { StateRestService } from '../../service/state/state-rest.service';

@ApiTags(Resource.STATE)
@Controller()
export class StateController {
  private readonly logger = new HaaLogger(StateController.name);

  constructor(private stateRestService: StateRestService) {}

  @Get(`${Resource.LIGHTS}/:lightId/${Resource.STATE}`)
  @ApiResponse({ status: HttpStatus.OK, type: ReadLightStateDto })
  getLightState(@Param('lightId') lightId: string) {
    this.logger.verbose(
      `lightId: ${JSON.stringify(lightId)}`,
      this.patchState.name
    );
    return this.stateRestService.getState(lightId);
  }

  @Patch(`${Resource.LIGHTS}/${Resource.STATE}`)
  @ApiResponse({ status: HttpStatus.OK })
  @ApiBody({ type: UpdateLightStateDto })
  patchStateAll(@Body() state: UpdateLightStateDto) {
    this.logger.verbose(
      `lightStateDto: ${JSON.stringify(state)}`,
      this.patchState.name
    );
    return this.stateRestService.updateAll(state);
  }

  @Patch(`${Resource.LIGHTS}/:id/${Resource.STATE}`)
  @ApiResponse({ status: HttpStatus.OK, type: ReadLightStateDto })
  @ApiBody({ type: UpdateLightStateDto })
  getState(@Param('id') id: string, @Body() state: UpdateLightStateDto) {
    this.logger.verbose(
      `id: ${id} lightStateDto: ${JSON.stringify(state)}`,
      this.getState.name
    );
    return this.stateRestService.update(id, state);
  }

  @Patch(`${Resource.LIGHTS}/:id/${Resource.STATE}`)
  @ApiResponse({ status: HttpStatus.OK, type: ReadLightStateDto })
  @ApiBody({ type: UpdateLightStateDto })
  patchState(@Param('id') id: string, @Body() state: UpdateLightStateDto) {
    this.logger.verbose(
      `id: ${id} lightStateDto: ${JSON.stringify(state)}`,
      this.patchState.name
    );
    return this.stateRestService.update(id, state);
  }
}
