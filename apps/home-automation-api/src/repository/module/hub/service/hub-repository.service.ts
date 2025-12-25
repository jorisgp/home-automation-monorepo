import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';
import { Model, Types } from 'mongoose';
import { HubDocument, HubEntity } from '../entity/hub.entity';

@Injectable()
export class HubRepositoryService {
  private readonly logger = new HaaLogger(HubRepositoryService.name);

  constructor(
    @InjectModel(HubEntity.name)
    public hubModel: Model<HubEntity>
  ) {}

  async create(hubEntity: HubEntity) {
    this.logger.debug(`create: ${JSON.stringify(hubEntity)}`, this.find.name);
    const newHubEntity = new this.hubModel(hubEntity);
    return newHubEntity.save();
  }

  async update(hubEntity: HubEntity) {
    this.logger.debug(`update: ${JSON.stringify(hubEntity)}`, this.find.name);
    const newHubEntity = new this.hubModel(hubEntity);
    return newHubEntity.save();
  }

  async findAll(): Promise<HubDocument[]> {
    this.logger.debug(``, this.findAll.name);
    return this.hubModel.find();
  }

  find(hubEntity: Partial<HubEntity>): Promise<HubDocument[]> {
    this.logger.debug(
      `hubEntity: ${JSON.stringify(hubEntity)}`,
      this.find.name
    );
    return this.hubModel.find({
      name: hubEntity.name,
      version: hubEntity.version,
    });
  }

  findOne(id: Types.ObjectId): Promise<HubDocument> {
    this.logger.debug(`id: ${id}`, this.findOne.name);
    return this.hubModel.findOne(id);
  }

  deleteOne(id: Types.ObjectId) {
    this.logger.debug(`id: ${id}`, this.deleteOne.name);
    return this.hubModel.findByIdAndDelete(id);
  }

  async deleteAll() {
    this.logger.debug(``, this.deleteAll.name);
    return this.hubModel.deleteMany({});
  }

  async findOrCreate(hubEntity: HubEntity) {
    this.logger.debug(
      `hubEntity: ${JSON.stringify(hubEntity)}`,
      this.findOrCreate.name
    );
    const hubList = await this.find(hubEntity);
    if (hubList.length === 1) {
      const foundHubEntity = hubList[0];
      foundHubEntity.version = hubEntity.version;
      foundHubEntity.name = hubEntity.name;
      foundHubEntity.ip = hubEntity.ip;
      foundHubEntity.modelId = hubEntity.modelId;
      foundHubEntity.user = hubEntity.user;
      return foundHubEntity.save();
    }
    return this.create(hubEntity);
  }
}
