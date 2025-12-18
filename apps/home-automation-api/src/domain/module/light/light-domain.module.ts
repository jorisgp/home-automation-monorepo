import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../../infrastructure/infrastructure.module';
import { RepositoryModule } from '../../../rest/repository/repository.module';
import { LightDomainService } from './service/light-domain.service';

@Module({
  imports: [InfrastructureModule, RepositoryModule],
  providers: [LightDomainService],
  exports: [LightDomainService],
})
export class LightDomainModule {}
export { LightDomainService };
