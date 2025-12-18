import { Test, TestingModule } from '@nestjs/testing';
import { HueDiscoveryService } from 'apps/home-automation-api/src/infrastructure/hue-api/service/hue-discovery/hue-discovery.service';
import { HueLightService } from 'apps/home-automation-api/src/infrastructure/hue-api/service/hue-light/hue-light.service';
import { HueService } from 'apps/home-automation-api/src/infrastructure/hue-api/service/hue/hue.service';
import { LightRepositoryService } from 'apps/home-automation-api/src/rest/repository/modules/light/service/light-repository.service';
import { LightDomainService } from './light-domain.service';

describe('LightResourceService', () => {
  let service: LightDomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LightDomainService,
        HueService,
        HueDiscoveryService,
        HueLightService,
        { provide: LightRepositoryService, useValue: {} },
      ],
    }).compile();

    service = module.get<LightDomainService>(LightDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
