import { HubBo } from 'apps/home-automation-api/src/domain/module/hub/bo/hub.bo';
import { ReadHubDto } from '../dto/read-hub.dto';

export class HubRestMapper {
  public static toDto(bridgeBo: HubBo): ReadHubDto {
    const dto = new ReadHubDto();
    dto.name = bridgeBo.name;
    dto.ipAddress = bridgeBo.ipAddress;
    dto.modelId = bridgeBo.modelId;
    dto.softwareVersion = bridgeBo.softwareVersion;
    return dto;
  }
}
