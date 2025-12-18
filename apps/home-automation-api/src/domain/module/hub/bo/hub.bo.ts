import { HubUserBo } from './hub-user.bo';

export class HubBo {
  id: string;
  name: string;
  ipAddress: string;
  modelId: string;
  softwareVersion: string;
  user: HubUserBo;
}
