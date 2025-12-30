import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HueDiscoveryService } from './module/hue-discovery/service/hue-discovery.service';
import { HueApiProviderService } from './service/hue-api-provider/hue-api-provider..service';
import { HueLightService } from './service/hue-light/hue-light.service';
import { HueService } from './service/hue/hue.service';

@Module({
  imports: [HttpModule],
  providers: [
    HueDiscoveryService,
    HueService,
    HueLightService,
    HueApiProviderService,
  ],
  exports: [HueService],
})
export class HueApiModule {}
