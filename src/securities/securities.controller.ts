import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { StartIPORequest } from './dto/StartIPORequest';
import { SecuritiesService } from './securities.service';

@Controller('securities')
export class SecuritiesController {
  @Inject(SecuritiesService)
  securitiesService: SecuritiesService;

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('start_ipo')
  async startIPO(@Body() body: StartIPORequest) {
    await this.securitiesService.startIPO(body);

    return 'Started IPO for ' + body.fullName;
  }
}
