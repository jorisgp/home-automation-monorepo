import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { plainToClass } from 'class-transformer';
import * as hueApiService from 'node-hue-api';

import { ReadBridgeUserDto } from './dto/read-bridge-user.dto';

import { ReadAuthorizedBridgeDto } from './dto/read-authorized-bridge.dto';
import { ReadBridgeDto } from './dto/read-bridge.dto';
import { ReadLocalBridgeDto } from './dto/read-local-bridge.dto';

@Injectable()
export class HueDiscoveryService {
  private readonly logger = new HaaLogger(HueDiscoveryService.name);
  private readonly APP_NAME = 'home-automation-api';
  private readonly DEVICE_NAME = 'home-automation-api-device';

  async getBridges(): Promise<ReadBridgeDto[]> {
    this.logger.debug(``, this.getBridges.name);
    let results = await hueApiService.discovery.nupnpSearch();
    return results.map((readBridgeDto) =>
      plainToClass(ReadBridgeDto, readBridgeDto)
    );
  }

  async getLocalBridges(): Promise<ReadLocalBridgeDto[]> {
    this.logger.debug(``, this.getLocalBridges.name);
    let results = await hueApiService.discovery.mdnsSearch();
    return results?.map((readBridgeDto) =>
      plainToClass(ReadLocalBridgeDto, readBridgeDto)
    );
  }

  async discoverAndCreateUser(): Promise<ReadAuthorizedBridgeDto[]> {
    this.logger.debug(``, this.discoverAndCreateUser.name);
    const readBridgeDtoList = await this.getLocalBridges();

    return await Promise.all(
      readBridgeDtoList?.map(async (readBridgeDto) => {
        const readAuthorizedBridgeDto = new ReadAuthorizedBridgeDto();
        readAuthorizedBridgeDto.bridge = readBridgeDto;
        readAuthorizedBridgeDto.user = await this._createUser(
          readBridgeDto.ipaddress
        );
        return readAuthorizedBridgeDto;
      })
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

enum HueErrorType {
  LINK_BUTTON_NOT_PRESSED = 101,
}
