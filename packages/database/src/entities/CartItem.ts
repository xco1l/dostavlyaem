import {
  Column,
  OneToOne,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import {Order} from './Order';
import {Product} from './Product';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(type => Product)
  @JoinColumn()
  product: Product;

  @Column('integer')
  quantity: number;

  @ManyToOne(
    type => Order,
    order => order.Cart,
  )
  order: Order;
}
