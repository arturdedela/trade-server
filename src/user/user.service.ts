import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InRegisterDto } from '../auth/dto/in.register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async getUser(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  create({ email, password, firstName, lastName, phoneNumber }: InRegisterDto): Promise<UserEntity> {
    const user = new UserEntity(email, password, phoneNumber, firstName, lastName);

    return this.userRepository.save(user);
  }

  async getUserMoney(userId: number): Promise<number> {
    const { rubles } = await this.getUser(userId);
    return rubles;
  }

  async deposit(userId: number, amount: number) {
    const user = await this.getUser(userId);
    user.rubles += amount;
    await this.userRepository.save(user);

    return user;
  }
}
