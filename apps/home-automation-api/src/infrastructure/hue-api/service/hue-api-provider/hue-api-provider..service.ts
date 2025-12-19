import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import * as hueApiService from 'node-hue-api';

@Injectable()
export class HueApiProviderService {
  private readonly logger = new HaaLogger(HueApiProviderService.name);

  constructor() {}

  private apis = new Map<string, any>();

  async getApi(ip: string, username: string) {
    this.logger.debug(`ip: ${ip} username: ${username}`, this.getApi.name);
    const key = `${ip}:${username}`;

    if (this.apis.has(key)) {
      this.logger.debug(
        `Returning cached API for key: ${key}`,
        this.getApi.name
      );
      return this.apis.get(key);
    }

    const api = await hueApiService.api.createLocal(ip).connect(username);

    this.apis.set(key, api);
    return api;
  }
}
