import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { LightRepositoryService } from 'apps/home-automation-api/src/rest/repository/modules/light/service/light-repository.service';

@Injectable()
export class StateDomainService {
  private readonly logger = new HaaLogger(StateDomainService.name);

  constructor(
    // private readonly hueService: HueService,
    private readonly lightRepisoryService: LightRepositoryService
  ) {}
}
