import { Module } from '@nestjs/common';
import { HueApiProviderService } from './service/hue-api-provider/hue-api-provider..service';
import { HueDiscoveryService } from './service/hue-discovery/hue-discovery.service';
import { HueLightService } from './service/hue-light/hue-light.service';
import { HueService } from './service/hue/hue.service';

@Module({
  providers: [
    HueDiscoveryService,
    HueService,
    HueLightService,
    HueApiProviderService,
  ],
  exports: [HueService],
})
export class HueApiModule {}
