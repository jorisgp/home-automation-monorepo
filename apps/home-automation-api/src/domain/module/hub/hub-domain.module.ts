import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HueDiscoveryModule } from 'apps/home-automation-api/src/infrastructure/hue-api/module/hue-discovery';
import { HubRepositoryModule } from 'apps/home-automation-api/src/repository';
import { HubDomainService } from './service/hub-domain.service';

@Module({
  imports: [HueDiscoveryModule, HubRepositoryModule, HttpModule],
  providers: [HubDomainService],
  exports: [HubDomainService],
})
export class HubDomainModule {}
export { HubDomainService };
