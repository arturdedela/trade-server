import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from '../shared/decorators/UserId';
import { PortfolioService } from './portfolio.service';

@ApiUseTags('portfolio')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('portfolio')
export class PortfolioController {
  @Inject(PortfolioService)
  portfolioService: PortfolioService;

  @Get()
  async getPortfolio(@UserId() userId: number) {
    return await this.portfolioService.getUserPortfolio(userId);
  }
}
