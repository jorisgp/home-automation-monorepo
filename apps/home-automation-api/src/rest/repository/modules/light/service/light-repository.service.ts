import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { ObjectId } from 'mongodb';
import { ClientSession, Model } from 'mongoose';
import { Collection } from '../../../constants/collection.constants';
import { LightDocument, LightEntity } from '../entity/light.entity';

@Injectable()
export class LightRepositoryService {
  private readonly logger = new HaaLogger(LightRepositoryService.name);

  constructor(
    @InjectModel(LightEntity.name)
    public lightModel: Model<LightEntity>
  ) {}

  async create(lightEntity: LightEntity) {
    this.logger.debug(`create: ${JSON.stringify(lightEntity)}`, this.find.name);
    const newLightEntity = new this.lightModel(lightEntity);
    return newLightEntity.save();
  }

  async update(
    id: ObjectId,
    lightEntity: Partial<LightEntity>,
    session?: ClientSession
  ): Promise<LightEntity> {
    this.logger.debug(`update: ${JSON.stringify(lightEntity)}`, this.find.name);
    return await this.lightModel.findOneAndUpdate(
      {
        _id: id,
      },
      lightEntity,
      { session }
    );
  }

  async findAll(): Promise<LightDocument[]> {
    this.logger.debug(``, this.findAll.name);
    return this.lightModel.find().populate(Collection.HUB);
  }

  async findOne(id: ObjectId): Promise<LightDocument> {
    this.logger.debug(`id: ${JSON.stringify(id)}`, this.findOne.name);
    return this.lightModel.findById(id).populate(Collection.HUB);
  }

  find(lightEntity: LightEntity): Promise<LightDocument[]> {
    this.logger.debug(
      `lightEntity: ${JSON.stringify(lightEntity)}`,
      this.find.name
    );
    return this.lightModel.find({
      hardwareId: lightEntity.hardwareId,
    });
  }

  async findOrCreate(lightEntity: LightEntity) {
    this.logger.debug(
      `lightEntity: ${JSON.stringify(lightEntity)}`,
      this.findOrCreate.name
    );
    const lightList = await this.find(lightEntity);
    if (lightList.length === 1) {
      const foundLightEntity = lightList[0];
      foundLightEntity.name = lightEntity.name;
      foundLightEntity.type = lightEntity.type;
      foundLightEntity.modelid = lightEntity.modelid;
      foundLightEntity.productName = lightEntity.productName;
      foundLightEntity.state = lightEntity.state;
      foundLightEntity.hub = lightEntity.hub;
      return foundLightEntity.save();
    }
    return this.create(lightEntity);
  }
}
