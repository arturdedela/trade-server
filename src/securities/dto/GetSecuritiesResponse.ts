import { SecurityEntity } from '../security.entity';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetSecuritiesResponse {
  constructor(securityEntity: SecurityEntity) {
    this.id = securityEntity.id;
    this.ticker = securityEntity.ticker;
    this.openPrice = securityEntity.openPrice;
    this.marketPrice = securityEntity.marketPrice;
    this.fullName = securityEntity.fullName;
    this.quantity = securityEntity.quantity;
    this.change = this.marketPrice - this.openPrice;
    this.changePercents = this.change / this.openPrice;
    this.marketCap = this.quantity * this.marketPrice;
  }

  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  ticker: string;

  @ApiModelProperty()
  openPrice: number;

  @ApiModelProperty()
  marketPrice: number;

  @ApiModelProperty()
  fullName: string;

  @ApiModelProperty()
  quantity: number;

  @ApiModelProperty()
  change: number;

  @ApiModelProperty()
  changePercents: number;

  @ApiModelProperty()
  marketCap: number;
}
