import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import {CartItem} from './CartItem';
import {User} from './User';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @OneToMany(
    type => CartItem,
    cartItem => cartItem.order,
  )
  Cart: CartItem[];

  @Column({type: 'date', default: new Date()})
  createdAt?: Date;

  @Column('varchar')
  contactPhone: string;

  @Column('decimal')
  cost: number;

  @ManyToOne(
    type => User,
    user => user.orders,
  )
  user: User;
}
