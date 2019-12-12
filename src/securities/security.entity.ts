import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SecurityEntity {
  constructor(ticker: string, fullName: string, price: number, quantity: number) {
    this.ticker = ticker;
    this.fullName = fullName;
    this.openPrice = this.marketPrice = price;
    this.quantity = quantity;
    this.marketCap = price * quantity;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  ticker: string;

  @Column('numeric')
  openPrice: number;

  @Column('numeric')
  marketPrice: number;

  // @Column()
  // type: string;

  @Column()
  fullName: string;

  @Column('numeric')
  marketCap: number;

  @Column()
  quantity: number;
}
