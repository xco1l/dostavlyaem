import {Column, PrimaryGeneratedColumn, BeforeInsert} from 'typeorm';
import {Entity} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}
