import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SecurityEntity } from '../securities/security.entity';
import { PortfolioModule } from '../portfolio/portfolio.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, SecurityEntity]), PortfolioModule],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
