import { Module } from '@nestjs/common';
import { HueDiscoveryService } from './service/hue-discovery.service';

@Module({
  providers: [HueDiscoveryService],
  exports: [HueDiscoveryService],
})
export class HueDiscoveryModule {}
