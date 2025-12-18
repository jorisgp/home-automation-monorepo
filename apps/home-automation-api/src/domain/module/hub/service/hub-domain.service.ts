import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { HueService } from 'apps/home-automation-api/src/infrastructure/hue-api/service/hue/hue.service';
import { HubRepositoryService } from 'apps/home-automation-api/src/rest/repository/modules/hub/service/hub-repository.service';
import { LightRepositoryService } from 'apps/home-automation-api/src/rest/repository/modules/light/service/light-repository.service';
import { LightBo } from '../../light/bo/light.bo';
import { LightEntityMapper } from '../../state/mapper/light-entity.mapper';
import { HubEntityMapper } from '../mapper/hub-bo.mapper';

@Injectable()
export class HubDomainService {
  private readonly logger = new HaaLogger(HubDomainService.name);

  constructor(
    private readonly hueService: HueService,
    private readonly hubRpositoryService: HubRepositoryService,
    private readonly lightRepisoryService: LightRepositoryService
  ) {}

  async findHub() {
    this.logger.debug(``, this.findHub.name);
    return await this.hueService.getLocalBridges();
  }

  async connectToHub() {
    this.logger.debug(``, this.connectToHub.name);
    const hubBoList = await this.hueService.createBridgeUsers();

    const hubEntitieList = hubBoList.map((hubBo) =>
      HubEntityMapper.toEntity(hubBo)
    );

    const createdHubEntities = hubEntitieList.map(async (hubEntity) => {
      await this.hubRpositoryService.findOrCreate(hubEntity);
    });

    return createdHubEntities;
  }

  async getAllLights() {
    this.logger.debug(``, this.getAllLights.name);
    const allHubs = await this.hubRpositoryService.findAll();

    const promiseLightResult = allHubs.map(
      async (hub) => await this.hueService.getLights(HubEntityMapper.toBo(hub))
    );

    const lightResult = await Promise.all(promiseLightResult);
    const flatLightResult = lightResult.flat();

    this._saveLights(flatLightResult);
  }

  private async _saveLights(lightBoList: LightBo[]) {
    this.logger.debug(
      `lightBoList: ${JSON.stringify(lightBoList)}`,
      this._saveLights.name
    );
    this.logger.debug(``, this._saveLights.name);
    const promiseArray = lightBoList.map((lightBo) =>
      this.lightRepisoryService.findOrCreate(
        LightEntityMapper.toEntity(lightBo)
      )
    );

    return await Promise.all(promiseArray);
  }
}
