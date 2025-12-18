import { ApiProperty } from '@nestjs/swagger';

export class ReadLightStateDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  on: boolean;

  @ApiProperty()
  brightness: number;

  @ApiProperty()
  hue: number;

  @ApiProperty()
  saturation: number;

  @ApiProperty()
  reachable: boolean;
}
