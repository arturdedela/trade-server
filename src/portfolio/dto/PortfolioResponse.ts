import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PortfolioResponse {
  @ApiModelProperty()
  @IsString()
  ticker: string;
}
