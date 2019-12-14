import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SecurityEntity } from './security.entity';
import { Repository } from 'typeorm';
import { StartIPORequest } from './dto/StartIPORequest';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class SecuritiesService {
  @InjectRepository(SecurityEntity)
  private securitiesRepository: Repository<SecurityEntity>;

  @Inject(OrdersService)
  private ordersService: OrdersService;

  async startIPO(userId: number, { ticker, fullName, price, quantity }: StartIPORequest) {
    const security = new SecurityEntity(ticker, fullName, price, quantity);
    await this.securitiesRepository.save(security);

    await this.ordersService.createIPOOrder(security);
  }
}
