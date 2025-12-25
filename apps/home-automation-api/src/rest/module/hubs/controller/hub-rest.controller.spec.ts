import { Test, TestingModule } from '@nestjs/testing';
import { HubDomainService } from 'apps/home-automation-api/src/domain';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { HubRestController } from './hub-rest.controller';
import { HubRestService } from '../service/hub-rest.service';

jest.mock('apps/home-automation-api/src/common/logger/haa-logger');

describe('HubRestController', () => {
  let controller: HubRestController;
  let hubRestService: HubRestService;

  const hubRestServiceMock = {
    connect: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn(),
  } as unknown as HubRestService;

  beforeEach(async () => {
    (HaaLogger as jest.Mock).mockClear();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HubRestController],
      providers: [
        HubRestService,
        { provide: HubDomainService, useValue: {} },
      ],
    })
      .overrideProvider(HubRestService)
      .useValue(hubRestServiceMock)
      .compile();

    controller = module.get<HubRestController>(HubRestController);
    hubRestService = module.get<HubRestService>(HubRestService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delegate connect to hubRestService and return its result', async () => {
    hubRestServiceMock.connect = jest.fn().mockResolvedValue([{ id: 'hub-1' }]);

    const result = await controller.put();

    expect(hubRestService.connect).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ id: 'hub-1' }]);
  });

  it('should call hubRestService.findAll and return the hub list', async () => {
    const hubs = [{ id: 'hub-1' }, { id: 'hub-2' }];
    hubRestServiceMock.findAll = jest.fn().mockResolvedValue(hubs);

    const result = await controller.findAll();

    expect(hubRestService.findAll).toHaveBeenCalledTimes(1);
    expect(result).toBe(hubs);
  });

  it('should call hubRestService.find with the provided hubId', async () => {
    const hubId = 'hub-123';
    const hub = { id: hubId };
    hubRestServiceMock.find = jest.fn().mockResolvedValue(hub);

    const result = await controller.find(hubId);

    expect(hubRestService.find).toHaveBeenCalledWith(hubId);
    expect(result).toBe(hub);
  });

  it('should pass an empty string to logger in put and not throw', async () => {
    const haaLoggerInstanceMock = {
      verbose: jest.fn(),
    } as unknown as HaaLogger;

    (HaaLogger as jest.Mock).mockImplementation(
      () => haaLoggerInstanceMock,
    );

    await expect(controller.put()).resolves.not.toThrow();
    expect(haaLoggerInstanceMock.verbose).toHaveBeenCalledWith('', 'put');
  });

  it('should log hubId when calling find', async () => {
    const hubId = 'hub-999';
    const haaLoggerInstanceMock = {
      verbose: jest.fn(),
    } as unknown as HaaLogger;

    (HaaLogger as jest.Mock).mockImplementation(
      () => haaLoggerInstanceMock,
    );

    await controller.find(hubId);

    expect(haaLoggerInstanceMock.verbose).toHaveBeenCalledWith(
      `hubId: ${hubId}`,
      'find',
    );
  });
});
