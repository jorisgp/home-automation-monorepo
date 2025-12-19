import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HubRepositoryModule } from './module/hub/hub-repository.module';
import { LightRepositoryModule } from './module/light/light-repository.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    HubRepositoryModule,
    LightRepositoryModule,
  ],
  exports: [HubRepositoryModule, LightRepositoryModule],
})
export class RepositoryModule {}
