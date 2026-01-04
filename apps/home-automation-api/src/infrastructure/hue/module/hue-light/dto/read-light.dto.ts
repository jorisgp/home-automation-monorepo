import { ReadLightCapabilitiesDto } from './read-light-capabilities.dto';
import { ReadLightConfigDto } from './read-light-config.dto';
import { ReadLightStateDto } from './read-light-state.dto';
import { ReadLightSwupdateDto } from './read-light-swupdate.dto';

export class ReadLightDto {
  data: ReadLightDataDto;
}

class ReadLightDataDto {
  id: string;
  state: ReadLightStateDto;
  swupdate: ReadLightSwupdateDto;
  type: string;
  name: string;
  modelid: string;
  manufacturername: string;
  productname: string;
  capabilities: ReadLightCapabilitiesDto;
  config: ReadLightConfigDto;
  uniqueid: string;
  swversion: string;
}
