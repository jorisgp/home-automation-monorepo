import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../../infrastructure/infrastructure.module';
import { RepositoryModule } from '../../../rest/repository/repository.module';
import { StateDomainService } from './service/state-domain.service';

@Module({
  imports: [InfrastructureModule, RepositoryModule],
  providers: [StateDomainService],
  exports: [StateDomainService],
})
export class StateDomainModule {}
export { StateDomainService };
