import { Test, TestingModule } from '@nestjs/testing';
import { LightRepositoryService } from 'apps/home-automation-api/src/rest/repository/modules/light/service/light-repository.service';
import { StateDomainService } from './state-domain.service';

describe('StateDomainService', () => {
  let service: StateDomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateDomainService,
        { provide: LightRepositoryService, useValue: {} },
      ],
    }).compile();

    service = module.get<StateDomainService>(StateDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
