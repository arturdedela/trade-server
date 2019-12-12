import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';

@Entity()
export class UserEntity {
  constructor(email: string, password: string, phoneNumber: string, firstName: string, lastName: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }

  static hashPassword(password: string) {
    return crypto.createHmac('sha256', password).digest('hex');
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @BeforeInsert()
  beforeInsert() {
    this.password = UserEntity.hashPassword(this.password);
  }

  isPasswordValid(password: string): boolean {
    return this.password === UserEntity.hashPassword(password);
  }
}
