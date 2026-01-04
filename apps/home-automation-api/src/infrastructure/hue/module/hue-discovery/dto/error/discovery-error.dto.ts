import { HueErrorType } from '../../enum';

export class DiscoveryErrorDto {
  error: {
    type: HueErrorType;
    address: string;
    description: string;
  };
}
