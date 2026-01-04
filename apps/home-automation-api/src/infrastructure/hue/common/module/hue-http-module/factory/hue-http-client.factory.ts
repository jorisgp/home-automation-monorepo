import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { HueHttpClient } from '../service/hue-http-client.service';

@Injectable()
export class HueHttpClientFactory {
  create(apiKey: string): HueHttpClient {
    return new HueHttpClient(axios.create(), apiKey);
  }
}
