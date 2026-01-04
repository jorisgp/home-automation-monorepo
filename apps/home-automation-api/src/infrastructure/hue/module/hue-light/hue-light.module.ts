import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HueHttpModule } from '../../common/module/hue-http.module';
import { HueLightService } from './service/hue-light.service';

@Module({
  imports: [HttpModule, HueHttpModule],
  providers: [HueLightService],
  exports: [HueLightService],
})
export class HueLightModule {}
