import { Injectable } from '@nestjs/common';
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

  findById(userId: number) {
    return this.userRepository.findOne({
      where: { id: userId },
    });
  }

  create({ email, password, firstName, lastName, phoneNumber }: InRegisterDto): Promise<UserEntity> {
    const user = new UserEntity(email, password, phoneNumber, firstName, lastName);

    return this.userRepository.save(user);
  }
}
