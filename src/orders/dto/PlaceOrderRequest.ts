import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { OrderOperation } from '../const/OrderOperation';

export class PlaceOrderRequest {
  @ApiModelProperty()
  @IsNumber()
  securityId: number;

  @ApiModelProperty()
  @IsString()
  operation: OrderOperation;

  @ApiModelProperty()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiModelProperty()
  @IsInt()
  @IsPositive()
  lots: number;
}
