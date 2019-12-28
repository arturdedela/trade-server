import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { FindConditions, Not, Raw, Repository } from 'typeorm';
import { SecurityEntity } from '../securities/security.entity';
import { OrderOperation } from './const/OrderOperation';
import { PlaceOrderRequest } from './dto/PlaceOrderRequest';
import { PortfolioService } from '../portfolio/portfolio.service';
import { OrderModel } from './models/order.model';
import { DealModel } from './models/deal.model';

@Injectable()
export class OrdersService {
  @Inject(PortfolioService)
  portfolioService: PortfolioService;

  @InjectRepository(OrderEntity)
  ordersRepository: Repository<OrderEntity>;

  @InjectRepository(SecurityEntity)
  securitiesRepository: Repository<SecurityEntity>;

  async createIPOOrder(security: SecurityEntity) {
    const IPOOrder = new OrderEntity(security, undefined, OrderOperation.Sell, security.quantity, security.marketPrice);

    await this.ordersRepository.save(IPOOrder);
  }

  async placeOrder(userId: number, { lots, operation, price, securityId }: PlaceOrderRequest): Promise<OrderEntity> {
    const security = await this.securitiesRepository.findOne(securityId);
    if (!security) {
      throw new NotFoundException('Security with id: ' + securityId + ' not found.');
    }

    const where: FindConditions<OrderEntity> = {
      userId: Raw(alias => `((${alias} != ${userId}) OR (${alias} ISNULL))`),
      securityId,
      operation: operation === OrderOperation.Sell ? OrderOperation.Buy : OrderOperation.Sell,
      cancelled: false,
      executedQuantity: Raw(alias => `${alias} < "lots"`),
    };

    if (price) {
      where.price = Raw(alias => `(${alias}=${price} OR ${alias} IS NULL)`);
    }

    const oppositeOpenOrders: OrderEntity[] = await this.ordersRepository.find({
      where, order: { price: price ? undefined : 'ASC', date: 'ASC' },
    });

    const newOrder = new OrderEntity(securityId, userId, operation, lots, price);

    const ordersForSave: OrderEntity[] = [];
    let orderExecutionTotalCost = 0;

    oppositeOpenOrders.some(order => {
      const availableLots = order.lots - order.executedQuantity;
      const requiredLots = newOrder.lots - newOrder.executedQuantity;

      ordersForSave.push(order);

      security.marketPrice = order.price || newOrder.price || security.marketPrice;

      if (availableLots >= requiredLots) {
        newOrder.executedQuantity += requiredLots;
        order.executedQuantity += requiredLots;
        orderExecutionTotalCost += requiredLots * security.marketPrice;

        if (order.userId) {
          this.portfolioService.updatePosition(order.userId, security.id, order.operation, requiredLots, security.marketPrice);
        }

        return true;
      }

      newOrder.executedQuantity += availableLots;
      order.executedQuantity += availableLots;
      orderExecutionTotalCost += availableLots * security.marketPrice;

      if (order.userId) {
        this.portfolioService.updatePosition(order.userId, security.id, order.operation, availableLots, security.marketPrice);
      }

      return false;
    });

    if (newOrder.executedQuantity) {
      this.portfolioService.updatePosition(
        userId,
        newOrder.securityId,
        newOrder.operation,
        newOrder.executedQuantity,
        orderExecutionTotalCost / newOrder.executedQuantity,
      );
    }

    await this.ordersRepository.save(ordersForSave.concat(newOrder));
    await this.securitiesRepository.save(security);

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

  async getUserOrders(userId: number): Promise<OrderModel[]> {
    const orders = await this.ordersRepository.find({
      where: {
        userId,
        executedQuantity: Raw(alias => `${alias} < "lots"`),
      },
      order: { date: 'DESC' },
      relations: ['security'],
    });

    return orders.map(order => new OrderModel(order));
  }

  async getUserDeals(userId: number): Promise<DealModel[]> {
    const orders = await this.ordersRepository.find({
      where: {
        userId,
        executedQuantity: Raw(alias => `${alias} = "lots"`),
      },
      order: { date: 'DESC' },
      relations: ['security'],
    });

    return orders.map(order => new DealModel(order));
  }

  async getLastDealForSecurity(securityId: number): Promise<OrderEntity | undefined> {
    return await this.ordersRepository.findOne({
      where: { securityId },
      order: { date: 'DESC' },
    });
  }
}
