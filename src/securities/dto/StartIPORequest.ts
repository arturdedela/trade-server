import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class StartIPORequest {
  @ApiModelProperty()
  @IsString()
  ticker: string;

  @ApiModelProperty()
  @IsString()
  fullName: string;

  @ApiModelProperty()
  @IsNumber()
  price: number;

  @ApiModelProperty()
  @IsNumber()
  quantity: number;
}
