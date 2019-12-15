import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { OrderOperation } from '../const/OrderOperation';

export class PlaceOrderResponse {
  @ApiModelProperty()
  @IsNumber()
  id: number;

  @ApiModelProperty()
  @IsNumber()
  securityId: number;

  @ApiModelProperty()
  @IsString()
  operation: OrderOperation;

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
