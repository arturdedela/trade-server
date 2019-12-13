import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { OrderType } from '../const/OrderType';

export class PlaceOrderResponse {
  @ApiModelProperty()
  @IsNumber()
  id: number;

  @ApiModelProperty()
  @IsNumber()
  securityId: number;

  @ApiModelProperty()
  @IsString()
  type: OrderType;

  @ApiModelProperty()
  @IsNumber()
  lots: number;

  @ApiModelProperty()
  @IsNumber()
  price?: number;

  @ApiModelProperty()
  @IsDate()
  date: string;

  @ApiModelProperty()
  @IsNumber()
  executedQuantity: number;

  @ApiModelProperty()
  @IsBoolean()
  cancelled: boolean;
}
