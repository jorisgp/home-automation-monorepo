import { Test, TestingModule } from '@nestjs/testing';
import { HueDiscoveryService } from '../hue-discovery/hue-discovery.service';
import { HueLightService } from '../hue-light/hue-light.service';
import { HueService } from './hue.service';

describe('HueDiscoveryService', () => {
  let service: HueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HueService, HueDiscoveryService, HueLightService],
    }).compile();

    service = module.get<HueService>(HueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
