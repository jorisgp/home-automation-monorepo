import { Module } from '@nestjs/common';
import { StateDomainModule } from 'apps/home-automation-api/src/domain';
import { StateController } from './controller/state/state.controller';
import { StateRestService } from './service/state/state-rest.service';

@Module({
  controllers: [StateController],
  providers: [StateRestService],
  imports: [StateDomainModule],
})
export class StateRestModule {}
