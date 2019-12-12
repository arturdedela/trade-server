import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class OutLoginDto {
  @ApiModelProperty()
  @IsString()
  readonly token: string;
}
