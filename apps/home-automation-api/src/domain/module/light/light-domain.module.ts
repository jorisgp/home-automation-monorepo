import { Module } from '@nestjs/common';
import { LightRepositoryModule } from 'apps/home-automation-api/src/repository';
import { InfrastructureModule } from '../../../infrastructure/infrastructure.module';
import { LightDomainService } from './service/light-domain.service';

@Module({
  imports: [InfrastructureModule, LightRepositoryModule],
  providers: [LightDomainService],
  exports: [LightDomainService],
})
export class LightDomainModule {}
export { LightDomainService };
