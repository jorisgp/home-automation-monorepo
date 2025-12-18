import { ReadLightCapabilitiesControlDto } from './read-light-capabilities-control.dto';
import { ReadLightCapabilitiesStreamingDto } from './read-light-capabilities-streaming.dto';

export class ReadLightCapabilitiesDto {
  certified: boolean;
  control: ReadLightCapabilitiesControlDto;
  streaming: ReadLightCapabilitiesStreamingDto;
}
