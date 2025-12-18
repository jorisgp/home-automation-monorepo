import { Test, TestingModule } from '@nestjs/testing';
import { LightDomainService } from 'apps/home-automation-api/src/domain';
import { LightRestService } from '../service/light-rest.service';
import { LightRestController } from './light-rest.controller';

describe('LightRestController', () => {
  let controller: LightRestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LightRestController],
      providers: [
        LightRestService,
        { provide: LightDomainService, useValue: {} },
      ],
    }).compile();

    controller = module.get<LightRestController>(LightRestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
