import {Column, PrimaryColumn, BeforeInsert} from 'typeorm';
import {Entity} from 'typeorm';
import {uuid} from 'uuidv4';
import {BcryptHasher} from '../services/hash.password';

@Entity()
export class User {
  private hash: BcryptHasher;
  constructor() {
    this.hash = new BcryptHasher();
  }
  @PrimaryColumn('uuid')
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

  @Column()
  confirmHash?: string;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await this.hash.createHash(this.password);
  }

  @BeforeInsert()
  async createCompareHash() {
    this.confirmHash = await this.hash.createHash(this.id);
  }
}
