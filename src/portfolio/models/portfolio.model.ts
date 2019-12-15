import { UserSecurityEntity } from '../userSecurity.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { PortfolioSecurityModel } from './portfolioSecurity.model';

export class PortfolioModel {
  @ApiModelProperty()
  readonly portfolioValue: number = 0;

  @ApiModelProperty()
  readonly profit: number = 0;

  @ApiModelProperty()
  readonly securities: PortfolioSecurityModel[];

  constructor(securities: UserSecurityEntity[]) {
    this.securities = securities.map(security => new PortfolioSecurityModel(security));

    for (const { equity, profit } of this.securities) {
      this.portfolioValue += equity;
      this.profit += profit;
    }
  }
}
