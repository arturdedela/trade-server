import { Controller, Post, UseGuards, Body, Req, HttpCode, Get, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiUseTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { InLoginDto } from './dto/in.login.dto';
import { InRegisterDto } from './dto/in.register.dto';
import { OutLoginDto } from './dto/out.login.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiOkResponse({ type: OutLoginDto })
  @Post('login')
  @HttpCode(200)
  login(@Body() body: InLoginDto, @Req() req): OutLoginDto {
    const token = this.authService.generateJwt(req.user);

    return { token };
  }

  @Post('register')
  async register(@Body() body: InRegisterDto) {
    await this.authService.registerUser(body);
  }
}
