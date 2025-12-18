import { Test, TestingModule } from '@nestjs/testing';
import { HueLightService } from './hue-light.service';

describe('HueLightService', () => {
  let service: HueLightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HueLightService],
    }).compile();

    service = module.get<HueLightService>(HueLightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
