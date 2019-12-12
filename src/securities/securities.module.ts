import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityEntity } from './security.entity';
import { SecuritiesController } from './securities.controller';
import { SecuritiesService } from './securities.service';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([SecurityEntity]), OrdersModule],
  providers: [SecuritiesService],
  controllers: [SecuritiesController],
})
export class SecuritiesModule {}
