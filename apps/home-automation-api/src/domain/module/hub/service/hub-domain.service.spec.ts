import { Test, TestingModule } from '@nestjs/testing';
import { HubDomainService } from './hub-domain.service';

describe('HubResourceService', () => {
  let service: HubDomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HubDomainService,
        { provide: HubDomainService, useValue: {} },
      ],
    }).compile();

    service = module.get<HubDomainService>(HubDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
