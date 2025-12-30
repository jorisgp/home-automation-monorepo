import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { HueDiscoveryService } from 'apps/home-automation-api/src/infrastructure/hue-api/module/hue-discovery';
import { HubRepositoryService } from 'apps/home-automation-api/src/repository/module/hub/service/hub-repository.service';
import { Types } from 'mongoose';
import { HubBo } from '../bo/hub.bo';
import { HubBoMapper } from '../mapper/hub-bo.mapper';
import { HubInfraBoMapper } from '../mapper/hub-infra-bo.mapper';

@Injectable()
export class HubDomainService {
  private readonly logger = new HaaLogger(HubDomainService.name);

  constructor(
    private readonly hueDiscoveryService: HueDiscoveryService,
    private readonly hubRpositoryService: HubRepositoryService
  ) {}

  async findAll(): Promise<HubBo[]> {
    this.logger.debug(``, this.findAll.name);
    const result = await this.hubRpositoryService.findAll();
    this.logger.debug(`result:  ${JSON.stringify(result)}`, this.findAll.name);
    // const bridges = await this.hueDiscoveryService.getBridges();
    // this.logger.debug(`bridges: ${JSON.stringify(bridges)}`, this.findAll.name);
    return result.map(HubBoMapper.toBo);
  }

  async find(id: string): Promise<HubBo> {
    this.logger.debug(``, this.find.name);
    const result = await this.hubRpositoryService.findOne(
      new Types.ObjectId(id)
    );
    return HubBoMapper.toBo(result);
  }

  async delete(hubId: string) {
    this.logger.debug(`hubId: ${hubId}`, this.find.name);
    const result = await this.hubRpositoryService.deleteOne(
      new Types.ObjectId(hubId)
    );
    this.logger.debug(`result: ${JSON.stringify(result)}`, this.find.name);

    return;
  }

  async deleteAll() {
    this.logger.debug(``, this.deleteAll.name);
    return await this.hubRpositoryService.deleteAll();
  }

  async connect() {
    this.logger.debug(``, this.connect.name);
    const readAuthorizedBridgeDtoList =
      await this.hueDiscoveryService.getBridgesAndCreateUser();

    const hubBoList = readAuthorizedBridgeDtoList.map(HubInfraBoMapper.toBo);

    await Promise.all(
      hubBoList.map(async (hubBo) => {
        await this.hubRpositoryService.findOrCreate(
          HubBoMapper.toEntity(hubBo)
        );
      })
    );

    return this.findAll();
  }
}
