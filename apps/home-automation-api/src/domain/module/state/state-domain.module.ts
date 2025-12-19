import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../../infrastructure/infrastructure.module';
import { StateDomainService } from './service/state-domain.service';

@Module({
  imports: [InfrastructureModule],
  providers: [StateDomainService],
  exports: [StateDomainService],
})
export class StateDomainModule {}
export { StateDomainService };
