import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { HubBo } from 'apps/home-automation-api/src/domain/module/hub/bo/hub.bo';
import { LightBo } from 'apps/home-automation-api/src/domain/module/light/bo/light.bo';
import { LightStateBo } from 'apps/home-automation-api/src/domain/module/state/bo/state.bo';
import { HueBridgeMapper } from '../../mapper/hue-bridge.mapper';
import { HueLightMapper } from '../../mapper/hue-light.mapper';
import { HueDiscoveryService } from '../hue-discovery/hue-discovery.service';
import { HueLightService } from '../hue-light/hue-light.service';

@Injectable()
export class HueService {
  private readonly logger = new HaaLogger(HueService.name);

  constructor(
    private hueDiscoveryService: HueDiscoveryService,
    private hueLightService: HueLightService
  ) {}

  async getBridges(): Promise<HubBo[]> {
    this.logger.debug(``, this.getBridges.name);
    const results = await this.hueDiscoveryService.getBridges();
    return results.map(HueBridgeMapper.readBridgeDtoToBridgeBo);
  }

  async getLocalBridges(): Promise<HubBo[]> {
    this.logger.debug(``, this.getBridges.name);
    const results = await this.hueDiscoveryService.getLocalBridges();
    return results.map(HueBridgeMapper.readBridgeDtoToBridgeBo);
  }

  async createBridgeUsers(): Promise<HubBo[]> {
    this.logger.debug(``, this.getBridges.name);
    const results = await this.hueDiscoveryService.discoverAndCreateUser();
    this.logger.debug(
      `results: ${JSON.stringify(results)}`,
      this.getBridges.name
    );
    return results?.map((dto) => HueBridgeMapper.readBridgeDtoToBridgeBo(dto));
  }

  async getLights(hubBo: HubBo): Promise<LightBo[]> {
    this.logger.debug(``, this.getLights.name);
    const results = await this.hueLightService.getAllLights({
      ipAddress: hubBo.ipAddress,
      username: hubBo.user?.username,
    });

    const resultBoList = results.map((readLightDto) =>
      HueLightMapper.toBo(readLightDto, hubBo)
    );

    this.logger.debug(
      `resultBoList: ${JSON.stringify(resultBoList)}`,
      this.getLights.name
    );

    return resultBoList;
  }

  async updateLightState(
    lightBo: LightBo,
    lightStateBo: LightStateBo
  ): Promise<LightBo> {
    this.logger.debug(
      `lightBo: ${JSON.stringify(lightBo)} lightStateBo: ${JSON.stringify(
        lightStateBo
      )}`,
      this.updateLightState.name
    );

    const authenticationDto = {
      ipAddress: lightBo.hub.ipAddress,
      username: lightBo.hub.user?.username,
    };

    const updateLightStateDto = HueLightMapper.toStateDto(lightStateBo);

    const readLightDto = await this.hueLightService.updateLightState(
      lightBo.lightId,
      updateLightStateDto,
      authenticationDto
    );

    return HueLightMapper.toBo(readLightDto, lightBo.hub);
  }
}
