import { LightBo } from 'apps/home-automation-api/src/domain/module/light/bo/light.bo';
import { ReadLightDto } from '../dto/read-light.dto';

export class LightRestMapper {
  public static toDto(bo: LightBo): ReadLightDto {
    const dto = new ReadLightDto();
    dto.id = bo.id;
    dto.name = bo.name;
    dto.hardwareId = bo.hardwareId;
    dto.type = bo.type;
    dto.modelid = bo.modelid;
    dto.manufacturerName = bo.manufacturerName;
    dto.productName = bo.productName;

    return dto;
  }

  public static toBo(dto: ReadLightDto): LightBo {
    const bo = new LightBo();
    bo.id = dto.id;
    bo.name = dto.name;
    bo.hardwareId = dto.hardwareId;
    bo.type = dto.type;
    bo.modelid = dto.modelid;
    bo.manufacturerName = dto.manufacturerName;
    bo.productName = dto.productName;
    return bo;
  }

  public static toBoList(dtoList: ReadLightDto[]): LightBo[] {
    return dtoList.map((dto) => this.toBo(dto));
  }

  public static toDtoList(boList: LightBo[]): ReadLightDto[] {
    return boList.map((bo) => this.toDto(bo));
  }
}
