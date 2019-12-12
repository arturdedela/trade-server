import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { OrderType } from '../const/OrderType';

export class PlaceOrderRequest {
  @ApiModelProperty()
  @IsNumber()
  securityId: number;

  @ApiModelProperty()
  @IsString()
  orderType: OrderType;

  @ApiModelProperty()
  @IsNumber()
  price: number;

  @ApiModelProperty()
  @IsNumber()
  lots: number;
}
