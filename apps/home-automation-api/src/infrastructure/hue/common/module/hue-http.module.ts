import { HttpModule } from '@nestjs/axios';

import { Module } from '@nestjs/common';
import { HueHttpClientFactory } from './hue-http-module/factory/hue-http-client.factory';

@Module({
  imports: [HttpModule],
  providers: [HueHttpClientFactory],
  exports: [HueHttpClientFactory],
})
export class HueHttpModule {}
