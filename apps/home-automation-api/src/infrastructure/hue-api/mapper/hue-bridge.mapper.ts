import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { HubUserBo } from 'apps/home-automation-api/src/domain/module/hub/bo/hub-user.bo';
import { HubBo } from 'apps/home-automation-api/src/domain/module/hub/bo/hub.bo';
import { ReadBridgeDetailedDto } from '../dto/read-bridge-detailed.dto';
import { ReadBridgeUserDto } from '../dto/read-bridge-user.dto';
import { ReadBridgeDto } from '../dto/read-bridge.dto';

export class HueBridgeMapper {
  private static logger = new HaaLogger(HueBridgeMapper.name);

  static readBridgeDtoToBridgeBo(
    dto: ReadBridgeDto | ReadBridgeDetailedDto
  ): HubBo {
    HueBridgeMapper.logger.debug(
      `dto: ${JSON.stringify(dto)}`,
      this.readBridgeDtoToBridgeBo.name
    );

    const bridgeBo = new HubBo();

    if (dto instanceof ReadBridgeDto) {
      bridgeBo.name = dto.config?.name;
      bridgeBo.ipAddress = dto.ipaddress;
      bridgeBo.modelId = dto.config?.modelid;
      bridgeBo.softwareVersion = dto.config?.swversion;
    } else if (dto instanceof ReadBridgeDetailedDto) {
      bridgeBo.name = dto.name;
      bridgeBo.ipAddress = dto.ipaddress;
      bridgeBo.modelId = dto.model.description;
      bridgeBo.softwareVersion = `${dto.version.major}.${dto.version.minor}`;
    }
    bridgeBo.user = HueBridgeMapper.ReadBridgeUserDtoToBridgeUserBo(dto.user);
    return bridgeBo;
  }

  static ReadBridgeUserDtoToBridgeUserBo(dto: ReadBridgeUserDto): HubUserBo {
    if (!dto) {
      return;
    }

    const bridgeUserBo = new HubUserBo();
    bridgeUserBo.username = dto.username;
    bridgeUserBo.password = dto.clientkey;
    return bridgeUserBo;
  }
}
