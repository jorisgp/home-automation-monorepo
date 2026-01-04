import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { from } from 'rxjs';
import { httpsAgent } from '../../../utils/htttp.utils';

export class HueHttpClient {
  private readonly HUE_APPLICATION_KEY_HEADER = 'hue-application-key';

  constructor(
    private readonly client: AxiosInstance,
    private readonly apiKey: string
  ) {}

  get<T>(url: string, config?: AxiosRequestConfig) {
    return from(
      this.client.get<T>(url, {
        ...config,
        headers: {
          ...(config?.headers || {}),
          [this.HUE_APPLICATION_KEY_HEADER]: this.apiKey,
        },
        httpsAgent: httpsAgent,
      })
    );
  }
}
