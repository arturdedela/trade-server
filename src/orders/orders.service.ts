import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersEntity } from './orders.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { SecurityEntity } from '../securities/security.entity';
import { OrderType } from './const/OrderType';
import { PlaceOrderRequest } from './dto/PlaceOrderRequest';

@Injectable()
export class OrdersService {
  @InjectRepository(OrdersEntity)
  ordersRepository: Repository<OrdersEntity>;

  async createIPOOrder(security: SecurityEntity) {
    const IPOOrder = new OrdersEntity(security, OrderType.Sell, security.quantity, security.marketPrice);

    await this.ordersRepository.save(IPOOrder);
  }

  async placeOrder({ lots, orderType, price, securityId }: PlaceOrderRequest): Promise<OrdersEntity> {
    const oppositeOrders = await this.ordersRepository.find({
      where: {
        securityId,
        type: orderType === OrderType.Sell ? OrderType.Buy : OrderType.Sell,
        cancelled: false,
        executed: false,
        price: MoreThanOrEqual(price),
      },
    });

    const newOrder = new OrdersEntity(securityId, orderType, lots, price);

    const ordersForSave: OrdersEntity[] = [];

    oppositeOrders.some(order => {
      const availableLots = order.lots - order.executedQuantity;

      ordersForSave.push(order);

      if (availableLots >= newOrder.lots) {
        newOrder.executedQuantity = newOrder.lots;
        order.executedQuantity += newOrder.lots;

        return true;
      }

      newOrder.executedQuantity += availableLots;
      order.executedQuantity += availableLots;

      return false;
    });

    await this.ordersRepository.save(ordersForSave.concat(newOrder));

    return newOrder;
  }
}
