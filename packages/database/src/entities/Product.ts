import {Column, PrimaryGeneratedColumn, Entity} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar')
  name: string;

  @Column('decimal')
  price: number;
}
