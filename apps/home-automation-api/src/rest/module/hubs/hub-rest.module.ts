import { Module } from '@nestjs/common';
import { HubDomainModule } from 'apps/home-automation-api/src/domain';
import { HubRestController } from './controller/hub-rest.controller';
import { HubRestService } from './service/hub-rest.service';

@Module({
  controllers: [HubRestController],
  providers: [HubRestService],
  imports: [HubDomainModule],
})
export class HubRestModule {}
