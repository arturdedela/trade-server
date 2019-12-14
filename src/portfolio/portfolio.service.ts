import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSecurityEntity } from './userSecurity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioService {
  @InjectRepository(UserSecurityEntity)
  userSecuritiesRepository: Repository<UserSecurityEntity>;

  async getUserPortfolio(userId: number) {
  }

  async updatePosition(userId: number, securityId: number, type: 'SELL' | 'BUY', position: number, price: number): Promise<UserSecurityEntity | null> {
    let userSecurity = await this.userSecuritiesRepository.findOne({ where: { userId, securityId }});
    position *= type === 'SELL' ? -1 : 1;

    if (userSecurity) {
      if (type === 'BUY') {
        userSecurity.average = (userSecurity.position * userSecurity.average + position * price) / (userSecurity.position + position);
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
