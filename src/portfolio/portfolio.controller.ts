import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from '../shared/decorators/UserId';
import { PortfolioService } from './portfolio.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('portfolio')
export class PortfolioController {
  @Inject(PortfolioService)
  portfolioService: PortfolioService;

  @Get()
  async getPortfolio(@UserId() userId: number) {
    await this.portfolioService.getUserPortfolio(userId);
  }
}
