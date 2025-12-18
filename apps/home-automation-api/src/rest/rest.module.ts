import { Module } from '@nestjs/common';
import { HubRestModule } from './module/hubs/hub-rest.module';
import { LightRestModule } from './module/lights/light-rest.module';
import { StateRestModule } from './module/state/state-rest.module';

@Module({
  imports: [HubRestModule, LightRestModule, StateRestModule],
})
export class RestModule {}
