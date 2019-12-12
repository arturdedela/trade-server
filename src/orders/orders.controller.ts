import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PlaceOrderRequest } from './dto/PlaceOrderRequest';
import { OrdersService } from './orders.service';
import { PlaceOrderResponse } from './dto/PlaceOrderResponse';

@Controller('orders')
export class OrdersController {
  @Inject(OrdersService)
  ordersService: OrdersService;

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('place')
  async placeOrder(@Body() body: PlaceOrderRequest): Promise<PlaceOrderResponse> {
    return await this.ordersService.placeOrder(body);
  }
}
