import { Body, Controller, Get, Inject, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PlaceOrderRequest } from './dto/PlaceOrderRequest';
import { OrdersService } from './orders.service';
import { PlaceOrderResponse } from './dto/PlaceOrderResponse';
import { CancelOrderRequest } from './dto/CancelOrderRequest';
import { UserId } from '../shared/decorators/UserId';

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

  @Get()
  async getUserOrder(@UserId() userId: number) {
    return await this.ordersService.getUserOrders(userId);
  }

  @Get('deals')
  async getUserDeals(@UserId() userId: number) {
    return await this.ordersService.getUserDeals(userId);
  }
}
