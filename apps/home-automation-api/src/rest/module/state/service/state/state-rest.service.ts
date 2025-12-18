import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { StateDomainService } from 'apps/home-automation-api/src/domain/module/state/service/state-domain.service';
import { UpdateLightStateDto } from '../../dto/update-light-state.dto';

@Injectable()
export class StateRestService {
  private readonly logger = new HaaLogger(StateRestService.name);

  constructor(private readonly stateDomainService: StateDomainService) {}

  getState(lightId: string) {
    this.logger.verbose(
      `lightId: ${JSON.stringify(lightId)}`,
      this.getState.name
    );
  }

  update(lightId: string, state: UpdateLightStateDto) {
    throw new Error('Method not implemented.');
  }

  updateAll(stateDto: any) {
    this.logger.verbose(
      `stateDto: ${JSON.stringify(stateDto)}`,
      this.updateAll.name
    );
  }
}
