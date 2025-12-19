import { ObjectId } from 'mongodb';

export class BaseEntity {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export class SubEntity {
  id: true;
  virtuals: true;
}
