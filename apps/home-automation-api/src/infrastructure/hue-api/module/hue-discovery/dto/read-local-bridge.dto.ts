import { ReadBridgeModelDto } from './read-bridge-model.dto';
import { ReadBridgeVersionDto } from './read-bridge-version.dto';

export class ReadLocalBridgeDto {
  name: string;
  manufacturer: string;
  ipaddress: string;
  model: ReadBridgeModelDto;
  version: ReadBridgeVersionDto;
}
