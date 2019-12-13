import { Body, Controller, Inject, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PlaceOrderRequest } from './dto/PlaceOrderRequest';
import { OrdersService } from './orders.service';
import { PlaceOrderResponse } from './dto/PlaceOrderResponse';
import { CancelOrderRequest } from './dto/CancelOrderRequest';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrdersController {
  @Inject(OrdersService)
  ordersService: OrdersService;

  @ApiOkResponse({ type: PlaceOrderResponse })
  @Post('place')
  async placeOrder(@Body() body: PlaceOrderRequest): Promise<PlaceOrderResponse> {
    return await this.ordersService.placeOrder(body);
  }

  @Put('cancel')
  async cancelOrder(@Body() body: CancelOrderRequest): Promise<void> {

    await this.ordersService.cancelOrder(body.orderId);
  }
}
