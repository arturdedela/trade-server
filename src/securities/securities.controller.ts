import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { StartIPORequest } from './dto/StartIPORequest';
import { SecuritiesService } from './securities.service';
import { UserId } from '../shared/decorators/UserId';

@Controller('securities')
export class SecuritiesController {
  @Inject(SecuritiesService)
  securitiesService: SecuritiesService;

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('start_ipo')
  async startIPO(@UserId() userId: number, @Body() body: StartIPORequest) {
    await this.securitiesService.startIPO(userId, body);

    return 'Started IPO for ' + body.fullName;
  }
}
