import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { HueService } from 'apps/home-automation-api/src/infrastructure/hue-api/service/hue/hue.service';
import { LightRepositoryService } from 'apps/home-automation-api/src/repository';
import { ObjectId } from 'mongodb';
import { LightStateBo } from '../../state/bo/state.bo';
import { LightBo } from '../bo/light.bo';
import { LightEntityMapper } from '../mapper/light-bo.mapper';

@Injectable()
export class LightDomainService {
  private readonly logger = new HaaLogger(LightDomainService.name);

  constructor(
    private readonly hueService: HueService,
    private readonly lightRepisoryService: LightRepositoryService
  ) {}

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

  async findOne(id: string) {
    this.logger.debug(``, this.findOne.name);
    const objectId = new ObjectId(id);
    const lightEntity = await this.lightRepisoryService.findOne(objectId);
    return LightEntityMapper.toBo(lightEntity);
  }

  async findAll(): Promise<LightBo[]> {
    this.logger.debug(``, this.findOne.name);
    const lightEntityList = await this.lightRepisoryService.findAll();
    return lightEntityList.map(LightEntityMapper.toBo);
  }

  async updateState(id: string, lightStateBo: LightStateBo): Promise<LightBo> {
    this.logger.debug(
      `id: ${id} lightStateBo: ${JSON.stringify(lightStateBo)}`,
      this.updateState.name
    );
    const objectId = new ObjectId(id);
    let lightEntity = await this.lightRepisoryService.findOne(objectId);
    const lightBo = LightEntityMapper.toBo(lightEntity);

    const updatedLightBo = await this.hueService.updateLightState(
      lightBo,
      lightStateBo
    );
    let updateEntity = LightEntityMapper.toEntity(updatedLightBo);
    updateEntity = await this.lightRepisoryService.update(
      objectId,
      updateEntity
    );
    return LightEntityMapper.toBo(updateEntity);
  }

  async blink(id: string): Promise<LightBo> {
    const LIGHT_INTERVAL = 882;
    this.logger.debug(`id: ${id}`, this.blink.name);
    const objectId = new ObjectId(id);
    let lightEntity = await this.lightRepisoryService.findOne(objectId);
    const lightBo = LightEntityMapper.toBo(lightEntity);

    const lightStateBo = new LightStateBo();
    lightStateBo.brightness = 100;
    lightStateBo.on = true;
    lightStateBo.saturation = 100;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let i = 0; i < 100; i++) {
      await this.hueService.updateLightState(lightBo, {
        ...lightStateBo,
        on: true,
      } as LightStateBo);
      await delay(LIGHT_INTERVAL);
      await this.hueService.updateLightState(lightBo, {
        ...lightStateBo,
        on: false,
      } as LightStateBo);
      await delay(LIGHT_INTERVAL);
    }

    return;
  }

  async updateStateAll(lightStateBo: LightStateBo): Promise<LightBo[]> {
    this.logger.debug(
      `lightStateBo: ${JSON.stringify(lightStateBo)}`,
      this.updateStateAll.name
    );

    let lightEntityList = await this.lightRepisoryService.findAll();

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const allUpdatedLightsPromise = lightEntityList.map(async (lightEntity) => {
      const lightBo = LightEntityMapper.toBo(lightEntity);
      await this.hueService.updateLightState(lightBo, lightStateBo);
      return await delay(1000);
    });

    await Promise.all(allUpdatedLightsPromise);

    const allResetLightsPromise = lightEntityList.map(async (lightEntity) => {
      const lightBo = LightEntityMapper.toBo(lightEntity);
      return await this.hueService.updateLightState(lightBo, lightBo.state);
    });

    return await Promise.all(allResetLightsPromise);
  }
}
