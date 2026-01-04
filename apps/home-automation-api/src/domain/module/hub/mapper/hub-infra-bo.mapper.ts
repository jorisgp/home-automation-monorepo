import { ReadAuthorizedBridgeDto } from 'apps/home-automation-api/src/infrastructure/hue/module/hue-discovery';
import { ReadUserDto } from 'apps/home-automation-api/src/infrastructure/hue/module/hue-discovery/dto/discover/read-user.dto';
import { HubUserBo } from '../bo/hub-user.bo';
import { HubBo } from '../bo/hub.bo';

export class HubInfraBoMapper {
  static toBo(dto: ReadAuthorizedBridgeDto): HubBo {
    console.log('Mapping ReadAuthorizedBridgeDto to HubBo:', dto);
    const bridgeBo = new HubBo();

    const bridgeDto = dto.bridge;
    const configDto = dto.config;
    bridgeBo.user = HubInfraBoMapper.toUserBo(dto.user);

    bridgeBo.name = configDto.name;
    bridgeBo.ipAddress = bridgeDto.internalipaddress;
    bridgeBo.uniqueId = bridgeDto.id;
    bridgeBo.modelId = configDto.modelid;
    bridgeBo.softwareVersion = configDto.swversion;
    bridgeBo.user = HubInfraBoMapper.toUserBo(dto.user);
    bridgeBo.lastSeen = new Date();

    return bridgeBo;
  }

  static toUserBo(dto: ReadUserDto): HubUserBo {
    if (!dto) {
      return;
    }

    const bridgeUserBo = new HubUserBo();
    bridgeUserBo.username = dto.username;
    return bridgeUserBo;
  }
}
