import { ReadBridgeUserDto } from './read-bridge-user.dto';

export class ReadBridgeDetailedDto {
  name: string;
  manufacturer: string;
  ipaddress: string;
  model: {
    number: string;
    description: string;
    name: string;
    serial: string;
  };
  version: {
    major: string;
    minor: string;
  };
  user: ReadBridgeUserDto;
}
