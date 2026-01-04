import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HueDiscoveryService } from './module/hue-discovery/service/hue-discovery.service';
import { HueApiProviderService } from './service/hue-api-provider/hue-api-provider..service';

import { HueService } from './service/hue/hue.service';

@Module({
  imports: [HttpModule],
  providers: [HueDiscoveryService, HueService, HueApiProviderService],
  exports: [HueService],
})
export class HueApiModule {}
