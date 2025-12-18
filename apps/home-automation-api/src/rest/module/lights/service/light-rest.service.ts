import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { LightDomainService } from 'apps/home-automation-api/src/domain';
import { LightRestMapper } from '../mapper/light-rest.mapper';

@Injectable()
export class LightRestService {
  private readonly logger = new HaaLogger(LightRestService.name);

  constructor(private readonly lightDomainService: LightDomainService) {}

  async find(id: string) {
    this.logger.log(``, this.find.name);
    const lightBo = await this.lightDomainService.findOne(id);
    return LightRestMapper.toDto(lightBo);
  }

  async findAll() {
    this.logger.log(``, this.find.name);
    const lightBoList = await this.lightDomainService.findAll();
    return lightBoList.map(LightRestMapper.toDto);
  }
}
