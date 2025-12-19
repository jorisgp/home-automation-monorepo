import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HubEntity, HubSchema } from './entity/hub.entity';
import { HubRepositoryService } from './service/hub-repository.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HubEntity.name, schema: HubSchema }]),
  ],
  providers: [HubRepositoryService],
  exports: [HubRepositoryService],
})
export class HubRepositoryModule {}
export { HubRepositoryService };
