import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import * as hueApiService from 'node-hue-api';
import { firstValueFrom, map } from 'rxjs';
import { HueHttpClientFactory } from '../../../common/module/hue-http-module/factory/hue-http-client.factory';

const LightState = hueApiService.v3.lightStates.LightState;

@Injectable()
export class HueLightService {
  private readonly logger = new HaaLogger(HueLightService.name);

  constructor(private hueHttpClientFactory: HueHttpClientFactory) {}

  createClient(key) {
    return this.hueHttpClientFactory.create(key);
  }

  async listLights(ipAddress: string, key: string): Promise<any> {
    this.logger.debug(``, this.listLights.name);
    const result = this.createClient(key)
      .get<any>(`https://${ipAddress}/clip/v2/resource/scene`)
      .pipe(map((response) => response.data));
    return firstValueFrom(result);
  }
}
