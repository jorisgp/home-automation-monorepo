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
    if (env === 'dev' && false) {
      return await hueApiService.api
        .createInsecureLocal(this.MOCK_ID, this.MOCK_PORT)
        .connect(username);
    }
    return await hueApiService.api.createInsecureLocal(ip).connect(username);
  }
}


JavaScript Object Notation: application/json4333	212.608529	192.168.1.179	192.168.1.172	HTTP/JSON	60	HTTP/1.1 200 OK , JSON (application/json)
4333	212.608529	192.168.1.179	192.168.1.172	HTTP/JSON	60	HTTP/1.1 200 OK , JSON (application/json)
