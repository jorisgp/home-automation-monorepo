export class ReadUserDto {
  username: string;
  clientkey: string;
}

export class ReadUserResponseDto {
  success: ReadUserDto;
}

export class ReadUserResponseListDto extends Array<ReadUserResponseDto> {}
