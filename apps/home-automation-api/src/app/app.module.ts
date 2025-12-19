import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestModule } from '../rest/rest.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), RestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
