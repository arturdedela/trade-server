import { OrderEntity } from '../order.entity';
import { OrderOperation } from '../const/OrderOperation';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export enum OrderStatus {
  Cancelled = 'Cancelled',
  Executed = 'Executed',
  Pending = 'Pending',
}

export class OrderModel {
  static OrderStatus(order: OrderEntity): OrderStatus {
    if (order.cancelled) {
      return OrderStatus.Cancelled;
    }
    if (order.executed) {
      return OrderStatus.Executed;
    }

    return OrderStatus.Pending;
  }

  constructor(order: OrderEntity) {
    this.ticker = order.security.ticker;
    this.operation = order.operation;
    this.lots = order.lots;
    this.price = order.price && Number(order.price);
    this.executedQuantity = order.executedQuantity;
    this.status = OrderModel.OrderStatus(order);
  }

  @ApiModelProperty()
  ticker: string;

  @ApiModelProperty()
  operation: OrderOperation;

  @ApiModelProperty()
  lots: number;

  @ApiModelPropertyOptional()
  price?: number;

  @ApiModelProperty()
  executedQuantity: number;

  @ApiModelProperty()
  status: OrderStatus;
}
