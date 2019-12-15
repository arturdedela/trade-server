import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { Controller, Get, Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from '../shared/decorators/UserId';
import { OutUserDto } from '../auth/dto/out.user.dto';
import { UserService } from './user.service';

@ApiUseTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  @Inject(UserService)
  userService: UserService;

  @Get()
  async user(@UserId() userId: number): Promise<OutUserDto> {
    const user = await this.userService.getUser(userId);

    if (!user) {
      throw new NotFoundException('User not found! Something seems to be wrong with your access token.');
    }

    return user;
  }

}
