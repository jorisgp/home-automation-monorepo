import { Test, TestingModule } from '@nestjs/testing';
import { HueApiProviderService } from './hue-api-provider..service';

describe('HueApiProviderService', () => {
  let service: HueApiProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HueApiProviderService],
    }).compile();

    service = module.get<HueApiProviderService>(HueApiProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
