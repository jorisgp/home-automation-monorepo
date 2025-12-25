import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { plainToClass } from 'class-transformer';
import * as hueApiService from 'node-hue-api';

import { DiscoveryType } from 'apps/home-automation-api/src/infrastructure/hue-api/module/hue-discovery/enum/discovery-type.enum';
import { ReadAuthorizedBridgeDto } from '../dto/read-authorized-bridge.dto';
import { ReadBridgeUserDto } from '../dto/read-bridge-user.dto';
import { ReadBridgeDto } from '../dto/read-bridge.dto';
import { ReadLocalBridgeDto } from '../dto/read-local-bridge.dto';
import { HueErrorType } from '../enum';

@Injectable()
export class HueDiscoveryService {
  private readonly logger = new HaaLogger(HueDiscoveryService.name);
  private readonly APP_NAME = 'home-automation-api';
  private readonly DEVICE_NAME = 'home-automation-api-device';

  async getBridgesAndCreateUser(
    discoveryType = DiscoveryType.MDNS
  ): Promise<ReadAuthorizedBridgeDto[]> {
    this.logger.debug(
      `discoveryType: ${discoveryType}`,
      this.getBridgesAndCreateUser.name
    );
    const readBridgeDtoList = await this.getBridges(discoveryType);

    const result = await Promise.all(
      readBridgeDtoList?.map(async (readBridgeDto) => {
        const readAuthorizedBridgeDto = new ReadAuthorizedBridgeDto();
        readAuthorizedBridgeDto.bridge = readBridgeDto;
        readAuthorizedBridgeDto.user = await this._createUser(
          readBridgeDto.ipaddress
        );
        return readAuthorizedBridgeDto;
      })
    );
    return result?.filter((res) => res.user !== undefined);
  }

  async getBridges(
    discoveryType = DiscoveryType.MDNS
  ): Promise<ReadBridgeDto[] | ReadLocalBridgeDto[]> {
    this.logger.debug(`discoveryType: ${discoveryType}`, this.getBridges.name);
    switch (discoveryType) {
      case DiscoveryType.MUPNP:
        return this._getBridgesNupnp();
      case DiscoveryType.MDNS:
        return this._getBridgesMdns();
    }
  }

  private async _getBridgesNupnp(): Promise<ReadBridgeDto[]> {
    this.logger.debug(``, this._getBridgesNupnp.name);
    let results = await hueApiService.discovery.nupnpSearch();
    return results.map((readBridgeDto) =>
      plainToClass(ReadBridgeDto, readBridgeDto)
    );
  }

  private async _getBridgesMdns(): Promise<ReadLocalBridgeDto[]> {
    this.logger.debug(``, this._getBridgesMdns.name);
    let results = await hueApiService.discovery.mdnsSearch();
    return results?.map((readBridgeDto) =>
      plainToClass(ReadLocalBridgeDto, readBridgeDto)
    );
  }

  private async _createUser(ipAddress: string): Promise<ReadBridgeUserDto> {
    this.logger.debug(`ipAddress: ${ipAddress}`, this._createUser.name);
    const unauthenticatedApi = await hueApiService.api
      .createLocal(ipAddress)
      .connect();

    let createdUser;
    try {
      createdUser = await unauthenticatedApi.users.createUser(this.APP_NAME);
      this.logger.debug(
        `Hue Bridge User: ${createdUser.username}`,
        this._createUser.name
      );
      this.logger.debug(
        `Hue Bridge User Client Key: ${createdUser.clientkey}`,
        this._createUser.name
      );

      const authenticatedApi = await hueApiService.api
        .createLocal(ipAddress)
        .connect(createdUser.username);

      const bridgeConfig =
        await authenticatedApi.configuration.getConfiguration();

      this.logger.debug(
        `Connected to Hue Bridge: ${bridgeConfig.name} :: ${bridgeConfig.ipaddress}`,
        this._createUser.name
      );
      return plainToClass(ReadBridgeUserDto, createdUser);
    } catch (err) {
      if (err.getHueErrorType() === HueErrorType.LINK_BUTTON_NOT_PRESSED) {
        this.logger.error(
          'The Link button on the bridge was not pressed. Please press the Link button and try again.',
          this._createUser.name
        );
      } else {
        this.logger.error(
          `Unexpected Error: ${err.message}`,
          this._createUser.name
        );
      }
      return;
    }
  }
}
