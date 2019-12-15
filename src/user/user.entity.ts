import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as crypto from 'crypto';
import { OrderEntity } from '../orders/order.entity';

@Entity()
export class UserEntity {
  constructor(email: string, password: string, phoneNumber: string, firstName: string, lastName: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.rubles = 0;
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

  @Column()
  rubles: number;

  @OneToMany(type => OrderEntity, order => order.user)
  orders?: OrderEntity[];

  @BeforeInsert()
  beforeInsert() {
    this.password = UserEntity.hashPassword(this.password);
  }

  isPasswordValid(password: string): boolean {
    return this.password === UserEntity.hashPassword(password);
  }
}
