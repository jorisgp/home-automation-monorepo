import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateLightStateDto {
  @ApiPropertyOptional()
  @IsOptional()
  on: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  brightness: number;

  @ApiPropertyOptional()
  @IsOptional()
  hue: number;

  @ApiPropertyOptional()
  @IsOptional()
  saturation: number;

  @ApiPropertyOptional()
  @IsOptional()
  reachable: boolean;
}
