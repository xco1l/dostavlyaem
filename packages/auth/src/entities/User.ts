import {Column, PrimaryGeneratedColumn} from 'typeorm';
import {Entity} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  userName: string;

  @Column()
  avatar?: string;

  @Column()
  password: string;

  @Column()
  confirmed?: boolean;

  @Column()
  confirmHash?: string;
}
