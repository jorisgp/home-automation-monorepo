import {
  ReadAuthorizedBridgeDto,
  ReadBridgeDto,
  ReadBridgeUserDto,
  ReadLocalBridgeDto,
} from 'apps/home-automation-api/src/infrastructure/hue-api/module/hue-discovery';
import { HubUserBo } from '../bo/hub-user.bo';
import { HubBo } from '../bo/hub.bo';

export class HubInfraBoMapper {
  static toBo(dto: ReadAuthorizedBridgeDto): HubBo {
    const bridgeBo = new HubBo();

    const bridgeDto = dto.bridge;
    bridgeBo.user = HubInfraBoMapper.toUserBo(dto.user);

    if (bridgeDto instanceof ReadBridgeDto) {
      bridgeBo.name = bridgeDto.config?.name;
      bridgeBo.ipAddress = bridgeDto.ipaddress;
      bridgeBo.modelId = bridgeDto.config?.modelid;
      bridgeBo.uniqueId = bridgeDto.config?.modelid;
    } else if (bridgeDto instanceof ReadLocalBridgeDto) {
      bridgeBo.name = bridgeDto.name;
      bridgeBo.ipAddress = bridgeDto.ipaddress;
      bridgeBo.modelId = bridgeDto.model.number;
      bridgeBo.uniqueId = bridgeDto.model.serial;
    }

    return bridgeBo;
  }

  static toUserBo(dto: ReadBridgeUserDto): HubUserBo {
    if (!dto) {
      return;
    }

    const bridgeUserBo = new HubUserBo();
    bridgeUserBo.username = dto.username;
    bridgeUserBo.password = dto.clientkey;
    return bridgeUserBo;
  }
}
