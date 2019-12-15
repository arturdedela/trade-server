import { UserSecurityEntity } from '../userSecurity.entity';
import { ApiModelProperty } from '@nestjs/swagger';

export class PortfolioSecurityModel {
  constructor(userSecurity: UserSecurityEntity) {
    this.ticker = userSecurity.security.ticker;
    this.position = userSecurity.position;
    this.marketPrice = userSecurity.security.marketPrice;
    this.equity = userSecurity.equity;
    this.averagePrice = userSecurity.averagePrice;
    this.profit = this.equity - this.averagePrice * this.position;
  }

  @ApiModelProperty()
  ticker: string;

  @ApiModelProperty()
  position: number;

  @ApiModelProperty()
  marketPrice: number;

  @ApiModelProperty()
  equity: number;

  @ApiModelProperty()
  averagePrice: number;

  @ApiModelProperty()
  profit: number;
}
