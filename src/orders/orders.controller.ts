import { Body, Controller, Get, Inject, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PlaceOrderRequest } from './dto/PlaceOrderRequest';
import { OrdersService } from './orders.service';
import { PlaceOrderResponse } from './dto/PlaceOrderResponse';
import { CancelOrderRequest } from './dto/CancelOrderRequest';
import { UserId } from '../shared/decorators/UserId';
import { OrderModel } from './models/order.model';
import { DealModel } from './models/deal.model';

@ApiUseTags('orders')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrdersController {
  @Inject(OrdersService)
  ordersService: OrdersService;

  @ApiOkResponse({ type: PlaceOrderResponse })
  @Post('place')
  async placeOrder(@UserId() userId, @Body() body: PlaceOrderRequest): Promise<PlaceOrderResponse> {
    return await this.ordersService.placeOrder(userId, body);
  }

  @Put('cancel')
  async cancelOrder(@Body() body: CancelOrderRequest): Promise<void> {
    await this.ordersService.cancelOrder(body.orderId);
  }

  @ApiOkResponse({ type: OrderModel, isArray: true })
  @Get()
  async getUserOrders(@UserId() userId: number) {
    const orders = await this.ordersService.getUserOrders(userId);
    console.log(orders);
    return orders;
  }

  @ApiOkResponse({ type: DealModel, isArray: true })
  @Get('deals')
  async getUserDeals(@UserId() userId: number) {
    return await this.ordersService.getUserDeals(userId);
  }
}
