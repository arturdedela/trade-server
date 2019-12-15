import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { StartIPORequest } from './dto/StartIPORequest';
import { SecuritiesService } from './securities.service';
import { UserId } from '../shared/decorators/UserId';
import { GetSecuritiesResponse } from './dto/GetSecuritiesResponse';

@ApiUseTags('securities')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('securities')
export class SecuritiesController {
  @Inject(SecuritiesService)
  securitiesService: SecuritiesService;

  @Post('start_ipo')
  async startIPO(@UserId() userId: number, @Body() body: StartIPORequest) {
    await this.securitiesService.startIPO(userId, body);

    return 'Started IPO for ' + body.fullName;
  }

  @ApiOkResponse({ type: GetSecuritiesResponse, isArray: true })
  @Get()
  async getSecurities() {
    const securities = await this.securitiesService.getSecurities();

    return securities.map(security => new GetSecuritiesResponse(security));
  }
}
