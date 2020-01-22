import {Column, PrimaryGeneratedColumn, Entity, OneToMany} from 'typeorm';
import {Order} from './Order';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  email: string;

  @Column()
  userName: string;

  @Column({nullable: false, default: ''})
  avatar?: string;

  @Column()
  password: string;

  @Column({nullable: false, default: false})
  confirmed?: boolean;

  @Column({nullable: false, default: ''})
  confirmHash?: string;

  @OneToMany(
    type => Order,
    order => order.user,
  )
  orders?: Order[];
}
