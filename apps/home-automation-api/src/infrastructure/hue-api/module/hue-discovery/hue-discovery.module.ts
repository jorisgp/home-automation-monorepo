import { Module } from '@nestjs/common';
import { HueApiProviderService } from '../../service/hue-api-provider/hue-api-provider..service';
import { HueDiscoveryService } from './service/hue-discovery.service';

@Module({
  providers: [HueDiscoveryService, HueApiProviderService],
  exports: [HueDiscoveryService],
})
export class HueDiscoveryModule {}
