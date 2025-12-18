import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { toPlainObject } from 'apps/home-automation-api/src/common/utils/haa.utiles';
import * as hueApiService from 'node-hue-api';
import { AuthenticationDto } from '../../dto/authentication.dto';
import { ReadLightDto } from '../../dto/light/read-light.dto';
import { UpdateLightStateDto } from '../../dto/light/update-light-state.dto';

const LightState = hueApiService.v3.lightStates.LightState;

@Injectable()
export class HueLightService {
  private readonly logger = new HaaLogger(HueLightService.name);

  async getAllLights(
    authenticationDto: AuthenticationDto
  ): Promise<ReadLightDto[] | any> {
    this.logger.debug(
      `authenticationDto: ${JSON.stringify(authenticationDto)}`,
      this.getAllLights.name
    );
    const authenticatedApi = await this._getAuthenticatedApi(authenticationDto);
    return await authenticatedApi.lights.getAll();
  }

  async updateLightState(
    lightId: string,
    updateLightStateDto: UpdateLightStateDto,
    authenticationDto: AuthenticationDto
  ): Promise<ReadLightDto> {
    this.logger.debug(
      `lightId: ${lightId} updateLightStateDto: ${JSON.stringify(
        updateLightStateDto
      )}`,
      this.updateLightState.name
    );
    const authenticatedApi = await this._getAuthenticatedApi(authenticationDto);
    const state = new LightState().populate(toPlainObject(updateLightStateDto));
    this.logger.debug(`state: ${state}`, this.updateLightState.name);
    const light = authenticatedApi.lights.setLightState(lightId, state);
    return light as unknown as ReadLightDto;
  }

  private async _getAuthenticatedApi(authenticationDto: AuthenticationDto) {
    this.logger.debug(
      `authenticationDto: ${JSON.stringify(authenticationDto)}`,
      this._getAuthenticatedApi.name
    );
    return await hueApiService.api
      .createLocal(authenticationDto.ipAddress)
      .connect(authenticationDto.username);
  }
}
