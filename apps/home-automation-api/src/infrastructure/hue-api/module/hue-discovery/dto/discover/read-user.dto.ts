export class ReadUserDto {
  success: {
    username: string;
  };
}

export class ReadUserResponseDto extends Array<ReadUserDto> {}
