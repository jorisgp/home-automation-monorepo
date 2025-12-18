import { Test, TestingModule } from '@nestjs/testing';
import { LightDomainService } from 'apps/home-automation-api/src/domain';
import { StateRestService } from './state-rest.service';

describe('LightRestService', () => {
  let service: StateRestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateRestService,
        { provide: LightDomainService, useValue: {} },
      ],
    }).compile();

    service = module.get<StateRestService>(StateRestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
