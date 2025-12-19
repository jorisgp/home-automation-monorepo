import { Module } from '@nestjs/common';
import {
  HubRepositoryModule,
  LightRepositoryModule,
} from 'apps/home-automation-api/src/repository';
import { InfrastructureModule } from '../../../infrastructure/infrastructure.module';
import { HubDomainService } from './service/hub-domain.service';

@Module({
  imports: [InfrastructureModule, HubRepositoryModule, LightRepositoryModule],
  providers: [HubDomainService],
  exports: [HubDomainService],
})
export class HubDomainModule {}
export { HubDomainService };
