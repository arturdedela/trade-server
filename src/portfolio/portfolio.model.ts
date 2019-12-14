import { UserSecurityEntity } from './userSecurity.entity';
import { ApiModelProperty } from '@nestjs/swagger';

export class PortfolioModel {
  @ApiModelProperty()
  readonly portfolioValue: number = 0;

  @ApiModelProperty()
  readonly profit: number = 0;

  @ApiModelProperty()
  readonly securities: UserSecurityEntity[];

  constructor(securities: UserSecurityEntity[]) {
    this.securities = securities;
    [this.portfolioValue, this.profit] = this.calcPortfolioValueAndProfit();
  }

  private calcPortfolioValueAndProfit(): [number, number] {
    let value = 0;
    let profit = 0;

    this.securities.forEach(({ position, average, security, equity }) => {
      value += equity;
      profit += equity - position * average;
    });

    return [value, profit];
  }
}
