import { Test, TestingModule } from '@nestjs/testing';
import { StateRestService } from '../../service/state/state-rest.service';
import { StateController } from './state.controller';

describe('LightController', () => {
  let controller: StateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateController],
      providers: [{ provide: StateRestService, useValue: {} }],
    }).compile();

    controller = module.get<StateController>(StateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
