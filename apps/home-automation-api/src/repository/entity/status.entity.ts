import { Prop } from '@nestjs/mongoose';

export abstract class StatusEntity {
  @Prop({ required: true })
  lastSeen: Date;
}
