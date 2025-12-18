import { PartialType } from '@nestjs/swagger';
import { ReadLightStateDto } from './read-light-state.dto';

export class UpdateLightStateDto extends PartialType(ReadLightStateDto) {}
