import { Prop } from '@nestjs/mongoose';

export class HubUserEntity {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}
