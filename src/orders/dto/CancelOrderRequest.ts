import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CancelOrderRequest {
  @ApiModelProperty()
  @IsNumber()
  orderId: number;
}
