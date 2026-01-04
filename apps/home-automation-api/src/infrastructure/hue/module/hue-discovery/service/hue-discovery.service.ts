import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';

import { firstValueFrom, map, tap } from 'rxjs';
import { httpsAgent } from '../../../common/utils/htttp.utils';
import { ReadAuthorizedBridgeDto } from '../dto';
import { ReadBridgeConfigDto } from '../dto/discover/read-bridge-config.dto';
import { ReadBridgeDto } from '../dto/discover/read-bridge.dto';
import {
  ReadUserResponseDto,
  ReadUserResponseListDto,
} from '../dto/discover/read-user.dto';
import { DiscoveryErrorDto } from '../dto/error/discovery-error.dto';

@Injectable()
export class HueDiscoveryService {
  private readonly logger = new HaaLogger(HueDiscoveryService.name);
  private readonly APP_NAME = 'home-automation-api';
  private readonly DEVICE_NAME = 'service';

  constructor(private httpService: HttpService) {}

  async discoverBridges(): Promise<ReadBridgeDto[]> {
    this.logger.debug(``, this.discoverBridges.name);
    const result = this.httpService
      .get<ReadBridgeDto[]>('https://discovery.meethue.com/')
      .pipe(map((response) => response.data));
    return firstValueFrom(result);
  }

  async getBridgeDetails(ipAddress: string): Promise<ReadBridgeConfigDto> {
    this.logger.debug(``, this.getBridgeDetails.name);
    const result = this.httpService
      .get<ReadBridgeConfigDto>(`https://${ipAddress}/api/0/config`, {
        httpsAgent: httpsAgent,
      })
      .pipe(map((response) => response.data));
    return firstValueFrom(result);
  }

  async getApplicationKey(
    ipAddress: string,
    devicetype: string
  ): Promise<ReadUserResponseDto> {
    this.logger.debug(
      `ipAddress: ${ipAddress} devicetype: ${devicetype}`,
      this.getApplicationKey.name
    );
    const result = this.httpService
      .post<ReadUserResponseListDto | DiscoveryErrorDto>(
        `https://${ipAddress}/api`,
        {
          devicetype: devicetype,
          generateclientkey: true,
        },
        {
          httpsAgent: httpsAgent,
        }
      )
      .pipe(
        map((response) => response.data[0]),
        tap((data) => {
          if (data.error) {
            throw new Error(JSON.stringify(data.error));
          }
        })
      );
    return firstValueFrom(result);
  }

  async createUser(
    ipAddress: string,
    username: string
  ): Promise<ReadBridgeConfigDto> {
    this.logger.debug(
      `ipAddress: ${ipAddress} username: ${username}`,
      this.createUser.name
    );
    const result = this.httpService
      .get<ReadBridgeConfigDto>(`https://${ipAddress}/auth/v1`, {
        headers: {
          'hue-application-key': username,
        },
        httpsAgent: httpsAgent,
      })
      .pipe(map((response) => response.data));
    return firstValueFrom(result);
  }

  async getBridgesAndCreateUser(): Promise<ReadAuthorizedBridgeDto[]> {
    this.logger.debug(``, this.getBridgesAndCreateUser.name);
    const readBridgeDtoList = await this.discoverBridges();

    this.logger.debug(
      `readBridgeDtoList: ${JSON.stringify(readBridgeDtoList)}`,
      this.getBridgesAndCreateUser.name
    );

    const resultArray: ReadAuthorizedBridgeDto[] = [];

    for (const bridge of readBridgeDtoList) {
      const readAuthorizedBridgeDto: ReadAuthorizedBridgeDto =
        new ReadAuthorizedBridgeDto();

      readAuthorizedBridgeDto.bridge = bridge;

      readAuthorizedBridgeDto.config = await this.getBridgeDetails(
        bridge.internalipaddress
      );

      const readUserDto = await this.getApplicationKey(
        bridge.internalipaddress,
        `${this.APP_NAME}#${this.DEVICE_NAME}`
      );

      readAuthorizedBridgeDto.user = readUserDto.success;

      this.logger.debug(
        `readUserDto: ${JSON.stringify(readUserDto)}`,
        this.getBridgesAndCreateUser.name
      );

      const createUserResult = await this.createUser(
        bridge.internalipaddress,
        readUserDto.success.username
      );

      this.logger.debug(
        `createUserResult: ${JSON.stringify(createUserResult)}`,
        this.getBridgesAndCreateUser.name
      );
      resultArray.push(readAuthorizedBridgeDto);
    }

    return resultArray;
  }
}
