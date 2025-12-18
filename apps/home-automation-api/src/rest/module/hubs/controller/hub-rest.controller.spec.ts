import { Test, TestingModule } from '@nestjs/testing';
import { LightDomainService } from 'apps/home-automation-api/src/domain';
import { LightRestController } from '../../lights/controller/light-rest.controller';
import { LightRestService } from '../../lights/service/light-rest.service';

describe('HubController', () => {
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
