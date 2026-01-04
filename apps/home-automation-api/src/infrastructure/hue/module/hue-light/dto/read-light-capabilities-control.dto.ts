import { ReadLightCapabilitiesControlCtDto } from './read-light-capabilities-control-ct.dto';

export class ReadLightCapabilitiesControlDto {
  mindimlevel: number;
  maxlumen: number;
  colorgamuttype: string;
  colorgamut: number[][];
  ct: ReadLightCapabilitiesControlCtDto;
}
