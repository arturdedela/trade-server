import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { InRegisterDto } from './dto/in.register.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /** Checks user credentials */
  async validateUser(email: string, pass: string): Promise<UserEntity | null> {
    const user = await this.userService.findByEmail(email);
    if (user && user.isPasswordValid(pass)) {
      return user;
    }

    return null;
  }

  generateJwt(user: UserEntity) {
    const payload = { email: user.email, sub: user.id };

    return this.jwtService.sign(payload);
  }

  async registerUser(userDto: InRegisterDto) {
    const user = await this.userService.findByEmail(userDto.email);

    if (user) {
      throw new ConflictException('User already exist');
    }

    await this.userService.create(userDto);
  }

  getUser(userId: number) {
    return this.userService.getUser(userId);
  }
}
