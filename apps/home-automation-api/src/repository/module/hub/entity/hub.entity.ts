import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Collection } from '../../../constants/collection.constants';
import { BaseEntity } from '../../../entity/base.entity';
import { StatusEntity } from '../../../entity/status.entity';
import { HubUserEntity } from './hub-user.entity';

@Schema({ collection: Collection.HUB, timestamps: true })
export class HubEntity extends BaseEntity implements StatusEntity {
  @Prop({ required: true, unique: true, maxlength: 20 })
  uniqueId: string;

  @Prop({ required: true, maxlength: 50 })
  name: string;

  @Prop({ required: true, maxlength: 15 })
  ip: string;

  @Prop()
  modelId: string;

  @Prop()
  version: string;

  @Prop()
  user: HubUserEntity;

  @Prop({ required: true, default: () => new Date() })
  lastSeen: Date;
}

export type PartialHubEntity = Partial<HubEntity>;
export type HubDocument = HydratedDocument<HubEntity>;
export const HubSchema = SchemaFactory.createForClass(HubEntity);
