import { ApiProperty } from '@nestjs/swagger';

export class ReadHubDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  ipAddress: string;

  @ApiProperty()
  modelId: string;

  @ApiProperty()
  softwareVersion: string;
}
