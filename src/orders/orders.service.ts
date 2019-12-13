import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersEntity } from './orders.entity';
import { FindConditions, Raw, Repository } from 'typeorm';
import { SecurityEntity } from '../securities/security.entity';
import { OrderType } from './const/OrderType';
import { PlaceOrderRequest } from './dto/PlaceOrderRequest';

@Injectable()
export class OrdersService {
  @InjectRepository(OrdersEntity)
  ordersRepository: Repository<OrdersEntity>;

  @InjectRepository(SecurityEntity)
  securitiesRepository: Repository<SecurityEntity>;

  async createIPOOrder(security: SecurityEntity) {
    const IPOOrder = new OrdersEntity(security, OrderType.Sell, security.quantity, security.marketPrice);

    await this.ordersRepository.save(IPOOrder);
  }

  async placeOrder({ lots, orderType, price, securityId }: PlaceOrderRequest): Promise<OrdersEntity> {
    const security = await this.securitiesRepository.findOne(securityId);
    if (!security) {
      throw new NotFoundException('Security with id: ' + securityId + ' not found.');
    }

    const where: FindConditions<OrdersEntity> = {
      securityId,
      type: orderType === OrderType.Sell ? OrderType.Buy : OrderType.Sell,
      cancelled: false,
      executedQuantity: Raw(alias => `${alias} < "lots"`),
    };

    if (price) {
      where.price = Raw(alias => `(${alias}=${price} OR ${alias} IS NULL)`);
    }

    const oppositeOpenOrders: OrdersEntity[] = await this.ordersRepository.find({
      select: ['id', 'lots', 'executedQuantity', 'date'],
      where: {
        securityId,
        type: orderType === OrderType.Sell ? OrderType.Buy : OrderType.Sell,
        cancelled: false,
        executedQuantity: Raw(alias => `${alias} < "lots"`),
      },
      order: { price: price ? undefined : 'ASC', date: 'ASC' },
    });

    const newOrder = new OrdersEntity(securityId, orderType, lots, price);

    const ordersForSave: OrdersEntity[] = [];

    oppositeOpenOrders.some(order => {
      const availableLots = order.lots - order.executedQuantity;
      const requiredLots = newOrder.lots - newOrder.executedQuantity;

      ordersForSave.push(order);

      if (availableLots >= requiredLots) {
        newOrder.executedQuantity = newOrder.lots;
        order.executedQuantity += requiredLots;

        return true;
      }

      newOrder.executedQuantity += availableLots;
      order.executedQuantity += availableLots;

      return false;
    });

    await this.ordersRepository.save(ordersForSave.concat(newOrder));

    return newOrder;
  }

  async cancelOrder(orderId: number): Promise<boolean> {
    const order = await this.ordersRepository.findOne(orderId, { select: ['lots', 'executedQuantity'] });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.executed) {
      throw new ConflictException('Order can\'t be cancelled, because it is already executed.');
    }

    await this.ordersRepository.update({ id: orderId }, { cancelled: true });

    return true;
  }
}
