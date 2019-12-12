import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SecurityEntity } from '../securities/security.entity';
import { OrderType } from './const/OrderType';

@Entity()
export class OrdersEntity {
  constructor(security: SecurityEntity | number, type: OrderType, lots: number, price: number) {
    if (typeof security === 'number') {
      this.securityId = security;
    } else {
      this.security = security;
    }
    this.type = type;
    this.lots = lots;
    this.price = price;
    this.cancelled = false;
    this.executedQuantity = 0;
  }

  get executed(): boolean {
    return this.lots === this.executedQuantity;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => SecurityEntity)
  security: SecurityEntity;

  @Column()
  securityId: number;

  @Column()
  type: OrderType;

  @Column()
  lots: number;

  @Column('numeric')
  price: number;

  @CreateDateColumn()
  date: string;

  @Column()
  executedQuantity: number;

  @Column()
  cancelled: boolean;
}
