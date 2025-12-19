import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LightEntity, LightSchema } from './entity/light.entity';
import { LightRepositoryService } from './service/light-repository.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LightEntity.name, schema: LightSchema },
    ]),
  ],
  providers: [LightRepositoryService],
  exports: [LightRepositoryService],
})
export class LightRepositoryModule {}
export { LightRepositoryService };
