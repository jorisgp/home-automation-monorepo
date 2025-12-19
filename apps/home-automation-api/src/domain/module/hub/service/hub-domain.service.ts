import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { HueService } from 'apps/home-automation-api/src/infrastructure/hue-api/service/hue/hue.service';
import { HubRepositoryService } from 'apps/home-automation-api/src/repository/module/hub/service/hub-repository.service';
import { Types } from 'mongoose';
import { HubBo } from '../bo/hub.bo';
import { HubEntityMapper } from '../mapper/hub-bo.mapper';

@Injectable()
export class HubDomainService {
  private readonly logger = new HaaLogger(HubDomainService.name);

  constructor(
    private readonly hueService: HueService,
    private readonly hubRpositoryService: HubRepositoryService
  ) {}

  async findAll(): Promise<HubBo[]> {
    this.logger.debug(``, this.findAll.name);
    const result = await this.hubRpositoryService.findAll();

    const bridges = await this.hueService.getBridges();
    this.logger.debug(`bridges: ${JSON.stringify(bridges)}`, this.findAll.name);
    return result.map(HubEntityMapper.toBo);
  }

  async find(id: string): Promise<HubBo> {
    this.logger.debug(``, this.find.name);
    const result = await this.hubRpositoryService.findOne(
      new Types.ObjectId(id)
    );
    return HubEntityMapper.toBo(result);
  }

  async connect() {
    this.logger.debug(``, this.connect.name);
    const hubBoList = await this.hueService.createBridgeUsers();

    const hubEntitieList = hubBoList.map((hubBo) =>
      HubEntityMapper.toEntity(hubBo)
    );

    await Promise.all(
      hubEntitieList.map(async (hubEntity) => {
        await this.hubRpositoryService.findOrCreate(hubEntity);
      })
    );

    return this.findAll();
  }
}
