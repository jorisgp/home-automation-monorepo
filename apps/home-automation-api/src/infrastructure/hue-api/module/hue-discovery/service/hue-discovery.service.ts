import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import * as https from 'https';
import { firstValueFrom, map } from 'rxjs';
import { ReadBridgeDetailsDto } from '../dto/discover/read-bridge-details.dto';
import { ReadBridgeDto } from '../dto/discover/read-bridge.dto';
import {
  ReadUserDto,
  ReadUserResponseDto,
} from '../dto/discover/read-user.dto';

@Injectable()
export class HueDiscoveryService {
  private readonly logger = new HaaLogger(HueDiscoveryService.name);
  private readonly APP_NAME = 'home-automation-api';
  private readonly DEVICE_NAME = 'service';
  private readonly agent = new https.Agent({
    rejectUnauthorized: false,
  });
  constructor(private httpService: HttpService) {}

  discoverBridges(): Promise<ReadBridgeDto[]> {
    this.logger.debug(``, this.discoverBridges.name);
    const result = this.httpService
      .get<ReadBridgeDto[]>('https://discovery.meethue.com/')
      .pipe(map((response) => response.data));
    return firstValueFrom(result);
  }

  async getBridgeDetails(ipAddress: string): Promise<ReadBridgeDetailsDto> {
    this.logger.debug(``, this.discoverBridges.name);
    const result = this.httpService
      .get<ReadBridgeDetailsDto>(`https://${ipAddress}/api/0/config`)
      .pipe(map((response) => response.data));
    return firstValueFrom(result);
  }

  async getApplicationKey(
    ipAddress: string,
    devicetype: string
  ): Promise<ReadUserDto> {
    this.logger.debug(
      `ipAddress: ${ipAddress} devicetype: ${devicetype}`,
      this.getApplicationKey.name
    );
    const result = this.httpService
      .post<ReadUserResponseDto>(
        `https://${ipAddress}/api`,
        {
          devicetype: devicetype,
        },
        {
          httpsAgent: this.agent,
        }
      )
      .pipe(
        map((response) => response.data),
        map((data) => data[0])
      );
    return firstValueFrom(result);
  }

  async createUser(
    ipAddress: string,
    username: string
  ): Promise<ReadBridgeDetailsDto> {
    this.logger.debug(
      `ipAddress: ${ipAddress} username: ${username}`,
      this.createUser.name
    );
    const result = this.httpService
      .get<ReadBridgeDetailsDto>(`https://${ipAddress}/auth/v1`, {
        headers: {
          'hue-application-key': username,
        },
        httpsAgent: this.agent,
      })
      .pipe(map((response) => response.data));
    return firstValueFrom(result);
  }

  async getBridgesAndCreateUser(): Promise<any> {
    this.logger.debug(``, this.getBridgesAndCreateUser.name);
    const readBridgeDtoList = await this.discoverBridges();

    this.logger.debug(
      `readBridgeDtoList: ${JSON.stringify(readBridgeDtoList)}`,
      this.getBridgesAndCreateUser.name
    );

    for (const bridge of readBridgeDtoList) {
      const readUserDto = await this.getApplicationKey(
        bridge.internalipaddress,
        `${this.APP_NAME}#${this.DEVICE_NAME}`
      );

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
    }
  }
}
