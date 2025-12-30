import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import * as hueApiService from 'node-hue-api';

@Injectable()
export class HueApiProviderService {
  private readonly logger = new HaaLogger(HueApiProviderService.name);
  private MOCK_ID = 'localhost';
  private MOCK_PORT = 8080;
  private apis = new Map<string, any>();

  async getApi(ip: string, username: string) {
    this.logger.debug(
      `ip: ${ip} username: ${username} env: ${process.env.NODE_ENV}`,
      this.getApi.name
    );
    const key = `${ip}:${username}`;

    if (this.apis.has(key)) {
      this.logger.debug(
        `Returning cached API for key: ${key}`,
        this.getApi.name
      );
      return this.apis.get(key);
    }

    const api = this._createApi(ip, username);

    this.apis.set(key, api);
    return api;
  }

  async getUnAuthenticatedApi(ip: string) {
    this.logger.debug(
      `ip: ${ip} env: ${process.env.NODE_ENV}`,
      this.getUnAuthenticatedApi.name
    );
    return this._createApi(ip);
  }

  async _createApi(ip: string, username?: string) {
    const env = process.env.NODE_ENV || 'dev';
    if (env === 'dev') {
      return await hueApiService.api
        .createInsecureLocal(this.MOCK_ID, this.MOCK_PORT)
        .connect(username);
    }
    return await hueApiService.api.createLocal(ip).connect(username);
  }
}
