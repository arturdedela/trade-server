import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { OrderType } from '../const/OrderType';

export class PlaceOrderRequest {
  @ApiModelProperty()
  @IsNumber()
  securityId: number;

  @ApiModelProperty()
  @IsString()
  orderType: OrderType;

  @ApiModelProperty()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiModelProperty()
  @IsInt()
  @IsPositive()
  lots: number;
}
