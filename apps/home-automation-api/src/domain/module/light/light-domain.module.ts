import { Module } from '@nestjs/common';
import { HueLightModule } from 'apps/home-automation-api/src/infrastructure/hue/module/hue-light/hue-light.module';
import {
  HubRepositoryModule,
  LightRepositoryModule,
} from 'apps/home-automation-api/src/repository';
import { LightDomainService } from './service/light-domain.service';

@Module({
  imports: [HueLightModule, LightRepositoryModule, HubRepositoryModule],
  providers: [LightDomainService],
  exports: [LightDomainService],
})
export class LightDomainModule {}
export { LightDomainService };
