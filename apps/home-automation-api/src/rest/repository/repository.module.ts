import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HubModule } from './modules/hub/hub.module';
import { LightModule } from './modules/light/light.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    HubModule,
    LightModule,
  ],
  exports: [HubModule, LightModule],
})
export class RepositoryModule {}
