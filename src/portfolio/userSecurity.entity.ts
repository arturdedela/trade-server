import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { SecurityEntity } from '../securities/security.entity';

@Entity()
export class UserSecurityEntity {
  constructor(user: UserEntity | number, security: SecurityEntity | number, position: number, average: number) {
    if (typeof user === 'number') {
      this.userId = user;
    } else {
      this.user = user;
    }
    if (typeof security === 'number') {
      this.securityId = security;
    } else {
      this.security = security;
    }
    this.position = position;
    this.average = average;
  }

  @ManyToOne(type => UserEntity)
  user: UserEntity;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(type => SecurityEntity, { eager: true })
  security: SecurityEntity;

  @PrimaryColumn()
  securityId: number;

  @Column()
  position: number;

  @Column('numeric')
  average: number;

  public get equity() {
    return this.security.marketPrice * this.position;
  }
}
