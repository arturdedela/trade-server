import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SecurityEntity } from '../securities/security.entity';
import { OrderType } from './const/OrderType';
import { UserEntity } from '../user/user.entity';

@Entity()
export class OrderEntity {
  constructor(security: SecurityEntity | number, user: UserEntity | number | undefined, type: OrderType, lots: number, price?: number) {
    if (typeof security === 'number') {
      this.securityId = security;
    } else {
      this.security = security;
    }
    // If user undefined, order is IPO
    if (user) {
      if (typeof user === 'number') {
        this.userId = user;
      } else {
        this.user = user;
      }
    }

    this.type = type;
    this.lots = lots;
    this.price = price;
    this.cancelled = false;
    this.executedQuantity = 0;
  }

  get isMarketPrice(): boolean {
    return !this.price;
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

  @ManyToOne(type => UserEntity)
  user?: UserEntity;

  @Column({ nullable: true })
  userId?: number;

  @Column()
  type: OrderType;

  @Column()
  lots: number;

  @Column('numeric', { nullable: true })
  price?: number;

  @CreateDateColumn()
  @UpdateDateColumn()
  date: string;

  @Column()
  executedQuantity: number;

  @Column()
  cancelled: boolean;
}
