import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Collection } from '../../../constants/collection.constants';
import { BaseEntity, SubEntity } from '../../../entity/base.entity';
import { HubEntity } from '../../hub/entity/hub.entity';

export class LightStateEntity extends SubEntity {
  @Prop({})
  on: boolean;

  @Prop({})
  brightness: number;

  @Prop({})
  hue: number;

  @Prop({})
  saturation: number;

  @Prop({})
  reachable: boolean;
}

@Schema({ collection: Collection.LIGHT, timestamps: true })
export class LightEntity extends BaseEntity {
  @Prop({})
  name: string;

  @Prop({})
  lightId: string;

  @Prop({})
  hardwareId: string;

  @Prop()
  type: string;

  @Prop()
  modelid: string;

  @Prop()
  manufacturerName: string;

  @Prop()
  productName: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: HubEntity.name,
    required: true,
  })
  hub: HubEntity;
}

export class PartialLightEntity extends LightEntity {}
export type LightDocument = HydratedDocument<LightEntity>;
export const LightSchema = SchemaFactory.createForClass(LightEntity);
