import { Test, TestingModule } from '@nestjs/testing';
import { HubDomainService } from 'apps/home-automation-api/src/domain';
import { HueDiscoveryService } from 'apps/home-automation-api/src/infrastructure/hue-api/service/hue-discovery/hue-discovery.service';
import { HueLightService } from 'apps/home-automation-api/src/infrastructure/hue-api/service/hue-light/hue-light.service';
import { HueService } from 'apps/home-automation-api/src/infrastructure/hue-api/service/hue/hue.service';
import { HubRepositoryService } from 'apps/home-automation-api/src/rest/repository/modules/hub/service/hub-repository.service';
import { LightRepositoryService } from 'apps/home-automation-api/src/rest/repository/modules/light/service/light-repository.service';
import { HubRestService } from './hub-rest.service';

describe('HubRestService', () => {
  let service: HubRestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HubRestService,
        HubDomainService,
        HueService,
        { provide: HubRepositoryService, useValue: {} },
        { provide: LightRepositoryService, useValue: {} },
        HueDiscoveryService,
        HueLightService,
      ],
    }).compile();

    service = module.get<HubRestService>(HubRestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
