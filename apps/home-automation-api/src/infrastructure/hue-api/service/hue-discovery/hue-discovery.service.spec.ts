import { Test, TestingModule } from '@nestjs/testing';
import { HueDiscoveryService } from './hue-discovery.service';

describe('HueDiscoveryService', () => {
  let service: HueDiscoveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HueDiscoveryService],
    }).compile();

    service = module.get<HueDiscoveryService>(HueDiscoveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
