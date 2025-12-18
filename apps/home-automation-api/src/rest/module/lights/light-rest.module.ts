import { Module } from '@nestjs/common';
import { LightDomainModule } from 'apps/home-automation-api/src/domain';
import { LightRestController } from './controller/light-rest.controller';
import { LightRestService } from './service/light-rest.service';

@Module({
  controllers: [LightRestController],
  providers: [LightRestService],
  imports: [LightDomainModule],
})
export class LightRestModule {}
