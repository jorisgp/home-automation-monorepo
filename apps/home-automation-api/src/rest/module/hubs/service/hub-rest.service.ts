import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { HubDomainService } from 'apps/home-automation-api/src/domain';
import { HubRestMapper } from '../mapper/hub-rest.mapper';

@Injectable()
export class HubRestService {
  private readonly logger = new HaaLogger(HubRestService.name);

  constructor(private readonly hubDomainService: HubDomainService) {}

  async find() {
    this.logger.log(``, this.find.name);
    const hubBoList = await this.hubDomainService.findHub();
    return hubBoList.map(HubRestMapper.toDto);
  }

  async connect() {
    this.logger.log(``, this.connect.name);
    await this.hubDomainService.connectToHub();
    return;
  }

  async findHubsLights() {
    this.logger.log(``, this.connect.name);
    await this.hubDomainService.getAllLights();
    return;
  }
}
