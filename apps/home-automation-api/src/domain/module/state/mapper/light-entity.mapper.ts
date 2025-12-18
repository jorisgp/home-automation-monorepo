import { LightEntity } from 'apps/home-automation-api/src/rest/repository/modules/light/entity/light.entity';
import { ObjectId } from 'mongodb';
import { HubEntityMapper } from '../../hub/mapper/hub-bo.mapper';
import { LightBo } from '../../light/bo/light.bo';

export class LightEntityMapper {
  public static toEntity(lightBo: LightBo): LightEntity {
    if (!lightBo) {
      return;
    }

    const lightEntity = new LightEntity();
    lightEntity._id = lightBo.id ? new ObjectId(lightBo.id) : undefined;
    lightEntity.lightId = lightBo.lightId;
    lightEntity.name = lightBo.name;
    lightEntity.type = lightBo.type;
    lightEntity.modelid = lightBo.modelid;
    lightEntity.productName = lightBo.productName;
    lightEntity.hardwareId = lightBo.hardwareId;
    lightEntity.state = lightBo.state as any;
    lightEntity.hub = HubEntityMapper.toEntity(lightBo.hub);
    return lightEntity;
  }

  public static toBo(lightEntity: LightEntity): LightBo {
    if (!lightEntity) {
      return;
    }

    const lightBo = new LightBo();
    lightBo.id = lightEntity._id.toHexString();
    lightBo.lightId = lightEntity.lightId;
    lightBo.name = lightEntity.name;
    lightBo.type = lightEntity.type;
    lightBo.modelid = lightEntity.modelid;
    lightBo.productName = lightEntity.productName;
    lightBo.state = lightEntity.state as any;
    lightBo.hardwareId = lightEntity.hardwareId;
    lightBo.hub = HubEntityMapper.toBo(lightEntity.hub);
    return lightBo;
  }
}
