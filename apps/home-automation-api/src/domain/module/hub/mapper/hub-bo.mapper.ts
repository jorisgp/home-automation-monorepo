import { ObjectId } from 'mongodb';
import {
  HubEntity,
  HubUserEntity,
} from '../../../../rest/repository/modules/hub/entity/hub.entity';
import { HubUserBo } from '../bo/hub-user.bo';
import { HubBo } from '../bo/hub.bo';

export class HubEntityMapper {
  public static toEntity(hubBo: HubBo): HubEntity {
    if (!hubBo) {
      return;
    }

    const entity = new HubEntity();
    entity._id = hubBo.id ? new ObjectId(hubBo.id) : undefined;
    entity.ip = hubBo.ipAddress;
    entity.name = hubBo.name;
    entity.modelId = hubBo.modelId;
    entity.version = hubBo.softwareVersion;
    entity.user = HubEntityMapper.toUserEntity(hubBo.user);
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
    bo.softwareVersion = entity.version;
    bo.user = HubEntityMapper.toUserBo(entity.user);
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
