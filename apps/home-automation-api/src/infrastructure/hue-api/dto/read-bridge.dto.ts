import { ReadBridgeUserDto } from './read-bridge-user.dto';

export class ReadBridgeDto {
  ipaddress: string;
  config?: {
    name: string;
    ipaddress: string;
    modelid: string;
    swversion: string;
  };
  user: ReadBridgeUserDto;
}
