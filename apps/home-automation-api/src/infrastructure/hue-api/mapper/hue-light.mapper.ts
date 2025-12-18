import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { HubBo } from 'apps/home-automation-api/src/domain/module/hub/bo/hub.bo';
import { LightBo } from 'apps/home-automation-api/src/domain/module/light/bo/light.bo';
import { LightStateBo } from 'apps/home-automation-api/src/domain/module/state/bo/state.bo';
import { ReadLightStateDto } from '../dto/light/read-light-state.dto';
import { ReadLightDto } from '../dto/light/read-light.dto';
import { UpdateLightStateDto } from '../dto/light/update-light-state.dto';

export class HueLightMapper {
  private static logger = new HaaLogger(HueLightMapper.name);

  static toBo(dto: ReadLightDto, hubBo?: HubBo): LightBo {
    HueLightMapper.logger.debug(`dto: ${JSON.stringify(dto)}`, this.toBo.name);
    const data = dto?.data;
    if (!data) {
      return;
    }

    const lightBo = new LightBo();
    lightBo.lightId = data.id;
    lightBo.name = data.name;
    lightBo.hardwareId = data.uniqueid;
    lightBo.type = data.type;
    lightBo.modelid = data.modelid;
    lightBo.manufacturerName = data.manufacturername;
    lightBo.productName = data.productname;
    lightBo.state = HueLightMapper.toStateBo(data.state);
    lightBo.hub = hubBo;

    return lightBo;
  }

  static toStateBo(dto: ReadLightStateDto): LightStateBo {
    HueLightMapper.logger.debug(
      `dto: ${JSON.stringify(dto)}`,
      this.toStateBo.name
    );
    if (!dto) {
      return;
    }

    const lightStateBo = new LightStateBo();
    lightStateBo.on = dto.on;
    lightStateBo.brightness = dto.bri;
    lightStateBo.hue = dto.hue;
    lightStateBo.saturation = dto.sat;
    lightStateBo.reachable = dto.reachable;
    return lightStateBo;
  }

  static toStateDto(bo: LightStateBo): UpdateLightStateDto {
    HueLightMapper.logger.debug(
      `bo: ${JSON.stringify(bo)}`,
      this.toStateDto.name
    );
    if (!bo) {
      return;
    }

    const dto = new UpdateLightStateDto();
    dto.on = bo.on;
    dto.bri = bo.brightness;
    dto.hue = bo.hue;
    dto.sat = bo.saturation;
    return dto;
  }
}
