import { HubUserBo } from './hub-user.bo';

export class HubBo {
  id: string;
  uniqueId: string;
  modelId: string;
  name: string;
  ipAddress: string;
  user: HubUserBo;
  lastSeen: Date;
}
