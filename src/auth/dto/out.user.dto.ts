import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class OutUserDto {
  @ApiModelProperty()
  @IsString()
  readonly email: string;
}
