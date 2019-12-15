import { OrderEntity } from '../order.entity';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { OrderOperation } from '../const/OrderOperation';

export class DealModel {
  constructor(order: OrderEntity) {
    this.ticker = order.security.ticker;
    this.time = order.date;
    this.price = order.price;
    this.lots = order.lots;
    this.operation = order.operation;
  }

  @ApiModelProperty()
  ticker: string;

  @ApiModelProperty()
  time: string;

  @ApiModelPropertyOptional()
  price?: number;

  @ApiModelProperty()
  lots: number;

  @ApiModelProperty()
  operation: OrderOperation;
}
