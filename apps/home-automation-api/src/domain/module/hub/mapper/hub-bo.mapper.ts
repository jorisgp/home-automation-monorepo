import { HubUserEntity } from 'apps/home-automation-api/src/repository/module/hub/entity/hub-user.entity';
import { ObjectId } from 'mongodb';
import { HubEntity } from '../../../../repository/module/hub/entity/hub.entity';
import { HubUserBo } from '../bo/hub-user.bo';
import { HubBo } from '../bo/hub.bo';

export class HubBoMapper {
  public static toEntity(hubBo: HubBo): HubEntity {
    if (!hubBo) {
      return;
    }

    const entity = new HubEntity();
    entity._id = hubBo.id ? new ObjectId(hubBo.id) : undefined;
    entity.ip = hubBo.ipAddress;
    entity.name = hubBo.name;
    entity.modelId = hubBo.modelId;
    entity.uniqueId = hubBo.uniqueId;
    entity.user = HubBoMapper.toUserEntity(hubBo.user);
    return entity;
  }

  public static toUserEntity(hubUserBo: HubUserBo): HubUserEntity {
    if (!hubUserBo) {
      return;
    }

    const entity = new HubUserBo();
    entity.username = hubUserBo.username;
    entity.password = hubUserBo.password;
    return entity;
  }

  public static toBo(entity: HubEntity): HubBo {
    if (!entity) {
      return;
    }

    const bo = new HubBo();
    bo.id = entity._id.toHexString();
    bo.ipAddress = entity.ip;
    bo.name = entity.name;
    bo.modelId = entity.modelId;
    bo.uniqueId = entity.uniqueId;
    bo.lastSeen = entity.lastSeen;
    bo.user = HubBoMapper.toUserBo(entity.user);
    return bo;
  }

  public static toUserBo(entity: HubUserEntity): HubUserBo {
    if (!entity) {
      return;
    }

    const bo = new HubUserBo();
    bo.username = entity.username;
    bo.password = entity.password;
    return bo;
  }
}
