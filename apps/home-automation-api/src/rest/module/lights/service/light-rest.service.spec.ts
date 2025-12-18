import { Test, TestingModule } from '@nestjs/testing';
import { LightDomainService } from 'apps/home-automation-api/src/domain';
import { LightRestService } from './light-rest.service';

describe('LightRestService', () => {
  let service: LightRestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LightRestService,
        { provide: LightDomainService, useValue: {} },
      ],
    }).compile();

    service = module.get<LightRestService>(LightRestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
