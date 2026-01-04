import { ReadBridgeConfigDto } from './read-bridge-config.dto';
import { ReadBridgeDto } from './read-bridge.dto';
import { ReadUserDto } from './read-user.dto';

export class ReadAuthorizedBridgeDto {
  bridge: ReadBridgeDto;
  config: ReadBridgeConfigDto;
  user: ReadUserDto;
}
