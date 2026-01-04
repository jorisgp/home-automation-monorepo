export class ReadBridgeConfigDto {
  name: string;
  datastoreversion: string;
  swversion: string;
  apiversion: string;
  mac: string;
  bridgeid: string;
  factorynew: boolean;
  replacesbridgeid: string | null;
  modelid: string;
  starterkitid: string;
}
