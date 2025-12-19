import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Collection } from '../../../constants/collection.constants';
import { BaseEntity } from '../../../entity/base.entity';

export class HubUserEntity {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

@Schema({ collection: Collection.HUB, timestamps: true })
export class HubEntity extends BaseEntity {
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
}

export class PartialHubEntity extends HubEntity {}
export type HubDocument = HydratedDocument<HubEntity>;
export const HubSchema = SchemaFactory.createForClass(HubEntity);
