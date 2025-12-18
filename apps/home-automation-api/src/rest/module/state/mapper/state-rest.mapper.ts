import { LightStateBo } from 'apps/home-automation-api/src/domain/module/state/bo/state.bo';
import { ReadLightStateDto } from '../dto/read-light-state.dto';
import { UpdateLightStateDto } from '../dto/update-light-state.dto';

export class StateRestMapper {
  public static toBo(dto: UpdateLightStateDto): LightStateBo {
    const bo = new LightStateBo();
    bo.on = dto.on;
    bo.brightness = dto.brightness;
    bo.hue = dto.hue;
    bo.saturation = dto.saturation;
    bo.reachable = dto.reachable;
    return bo;
  }

  public static toDto(bo: LightStateBo): ReadLightStateDto {
    const dto = new ReadLightStateDto();
    dto.id = bo.id;
    dto.on = bo.on;
    dto.brightness = bo.brightness;
    dto.hue = bo.hue;
    dto.saturation = bo.saturation;
    dto.reachable = bo.reachable;
    return bo;
  }

  public static toBoList(dtoList: ReadLightStateDto[]): LightStateBo[] {
    return dtoList.map((dto) => this.toBo(dto));
  }

  public static toDtoList(boList: LightStateBo[]): ReadLightStateDto[] {
    return boList.map((bo) => this.toDto(bo));
  }
}
