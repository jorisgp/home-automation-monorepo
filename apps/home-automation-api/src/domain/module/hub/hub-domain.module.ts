import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../../infrastructure/infrastructure.module';
import { RepositoryModule } from '../../../rest/repository/repository.module';
import { HubDomainService } from './service/hub-domain.service';

@Module({
  imports: [InfrastructureModule, RepositoryModule],
  providers: [HubDomainService],
  exports: [HubDomainService],
})
export class HubDomainModule {}
export { HubDomainService };
