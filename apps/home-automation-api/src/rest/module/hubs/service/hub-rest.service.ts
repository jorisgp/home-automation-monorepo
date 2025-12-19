import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { HubDomainService } from 'apps/home-automation-api/src/domain';
import { HubRestMapper } from '../mapper/hub-rest.mapper';

@Injectable()
export class HubRestService {
  private readonly logger = new HaaLogger(HubRestService.name);

  constructor(private readonly hubDomainService: HubDomainService) {}

  async findAll() {
    this.logger.log(``, this.findAll.name);
    const hubBoList = await this.hubDomainService.findAll();
    return hubBoList.map(HubRestMapper.toDto);
  }

  async find(hubId: string) {
    this.logger.log(`hubId: ${hubId}`, this.find.name);
    const hubBoList = await this.hubDomainService.find(hubId);
    return HubRestMapper.toDto(hubBoList);
  }

  async connect() {
    this.logger.log(``, this.connect.name);
    await this.hubDomainService.connect();
    return;
  }
}
