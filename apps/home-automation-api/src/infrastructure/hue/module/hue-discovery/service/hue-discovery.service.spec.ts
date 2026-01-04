import { Test, TestingModule } from '@nestjs/testing';
import { ConsoleLogger } from '@nestjs/common';
import { HueDiscoveryService } from './hue-discovery.service';
import * as hueApiService from 'node-hue-api';

jest.mock('node-hue-api', () => ({
  discovery: {
    nupnpSearch: jest.fn(),
    mdnsSearch: jest.fn(),
  },
  api: {
    createLocal: jest.fn(),
  },
}));

describe('HueDiscoveryService', () => {
  let service: HueDiscoveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HueDiscoveryService],
    }).compile();

    service = module.get<HueDiscoveryService>(HueDiscoveryService);

    // silence real ConsoleLogger output used inside HaaLogger
    jest.spyOn(ConsoleLogger.prototype, 'debug').mockImplementation(() => {});
    jest.spyOn(ConsoleLogger.prototype, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getBridges should map results via class-transformer', async () => {
    const bridges = [
      { ipaddress: '1.2.3.4', config: { name: 'Bridge A' } },
      { ipaddress: '5.6.7.8', config: { name: 'Bridge B' } },
    ];
    (hueApiService.discovery.nupnpSearch as jest.Mock).mockResolvedValue(bridges);

    const result = await service.getBridges();

    expect(hueApiService.discovery.nupnpSearch).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result[0].ipaddress).toBe('1.2.3.4');
    expect(result[1].config.name).toBe('Bridge B');
  });

  it('getLocalBridges should map results via class-transformer and handle undefined', async () => {
    (hueApiService.discovery.mdnsSearch as jest.Mock).mockResolvedValue([
      {
        name: 'Local 1',
        manufacturer: 'Philips',
        ipaddress: '10.0.0.2',
        model: { id: 'ABC' },
        version: { api: '1.0' },
      },
    ]);

    const result = await service.getLocalBridges();
    expect(hueApiService.discovery.mdnsSearch).toHaveBeenCalledTimes(1);
    expect(result[0].name).toBe('Local 1');

    // undefined case -> should not throw and return undefined/empty mapping
    (hueApiService.discovery.mdnsSearch as jest.Mock).mockResolvedValue(undefined);
    const result2 = await service.getLocalBridges();
    expect(result2).toBeUndefined();
  });

  it('discoverAndCreateUser should call _createUser for each local bridge and return combined dto', async () => {
    (hueApiService.discovery.mdnsSearch as jest.Mock).mockResolvedValue([
      { name: 'Local 1', manufacturer: 'Philips', ipaddress: '10.0.0.2' },
      { name: 'Local 2', manufacturer: 'Philips', ipaddress: '10.0.0.3' },
    ]);

    // mock the internal private method via prototype spying
    const user1 = { username: 'u1', clientkey: 'ck1' };
    const user2 = { username: 'u2', clientkey: 'ck2' };
    const spy = jest
      .spyOn<any, any>(HueDiscoveryService.prototype, '_createUser')
      .mockResolvedValueOnce(user1)
      .mockResolvedValueOnce(user2);

    const result = await service.discoverAndCreateUser();

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenNthCalledWith(1, '10.0.0.2');
    expect(spy).toHaveBeenNthCalledWith(2, '10.0.0.3');
    expect(result).toHaveLength(2);
    expect(result[0].bridge.ipaddress).toBe('10.0.0.2');
    expect(result[0].user.username).toBe('u1');
  });

  it('_createUser should create and authenticate when no error', async () => {
    const unauthenticatedApi = {
      users: { createUser: jest.fn().mockResolvedValue({ username: 'abc', clientkey: 'ck' }) },
    };
    const authenticatedApi = {
      configuration: { getConfiguration: jest.fn().mockResolvedValue({ name: 'Bridge', ipaddress: '1.1.1.1' }) },
    };

    (hueApiService.api.createLocal as jest.Mock).mockReturnValue({
      connect: jest
        .fn()
        .mockResolvedValueOnce(unauthenticatedApi)
        .mockResolvedValueOnce(authenticatedApi),
    });

    const result = await (service as any)._createUser('1.2.3.4');

    expect(hueApiService.api.createLocal).toHaveBeenCalledWith('1.2.3.4');
    expect(unauthenticatedApi.users.createUser).toHaveBeenCalledWith('home-automation-api');
    expect(authenticatedApi.configuration.getConfiguration).toHaveBeenCalled();
    expect(result.username).toBe('abc');
    expect(result.clientkey).toBe('ck');
  });

  it('_createUser should handle LINK_BUTTON_NOT_PRESSED error and return undefined', async () => {
    const unauthenticatedApi = {
      users: {
        createUser: jest.fn().mockRejectedValue({
          getHueErrorType: () => 101,
          message: 'link not pressed',
        }),
      },
    };

    (hueApiService.api.createLocal as jest.Mock).mockReturnValue({
      connect: jest.fn().mockResolvedValue(unauthenticatedApi),
    });

    const result = await (service as any)._createUser('1.2.3.4');
    expect(result).toBeUndefined();
  });
});
