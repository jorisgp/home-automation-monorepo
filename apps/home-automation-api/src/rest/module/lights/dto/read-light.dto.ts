import { ApiProperty } from '@nestjs/swagger';

export class ReadLightDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  hardwareId: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  modelid: string;

  @ApiProperty()
  manufacturerName: string;

  @ApiProperty()
  productName: string;
}
