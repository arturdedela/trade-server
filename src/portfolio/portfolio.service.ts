import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSecurityEntity } from './userSecurity.entity';
import { Repository } from 'typeorm';
import { OrderOperation } from '../orders/const/OrderOperation';
import { PortfolioModel } from './models/portfolio.model';

@Injectable()
export class PortfolioService {
  @InjectRepository(UserSecurityEntity)
  userSecuritiesRepository: Repository<UserSecurityEntity>;

  async getUserPortfolio(userId: number): Promise<PortfolioModel> {
    const securities = await this.userSecuritiesRepository.find({ userId });

    return new PortfolioModel(securities);
  }

  async updatePosition(userId: number, securityId: number, type: OrderOperation, position: number, price: number): Promise<UserSecurityEntity | null> {
    let userSecurity = await this.userSecuritiesRepository.findOne({ where: { userId, securityId }});
    position *= type === OrderOperation.Sell ? -1 : 1;

    if (userSecurity) {
      if (type === OrderOperation.Buy) {
        userSecurity.averagePrice = (userSecurity.position * userSecurity.averagePrice + position * price) / (userSecurity.position + position);
      }

      userSecurity.position += position;

      if (userSecurity.position === 0) {
        await this.userSecuritiesRepository.remove(userSecurity);

        return null;
      }
    } else {
      userSecurity = new UserSecurityEntity(userId, securityId, position, price);
    }

    return await this.userSecuritiesRepository.save(userSecurity);
  }
}
