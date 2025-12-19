import { ReadBridgeUserDto } from './read-bridge-user.dto';
import { ReadBridgeDto } from './read-bridge.dto';
import { ReadLocalBridgeDto } from './read-local-bridge.dto';

export class ReadAuthorizedBridgeDto {
  bridge: ReadLocalBridgeDto | ReadBridgeDto;
  user: ReadBridgeUserDto;
}
