import {Entity, model, property, hasMany} from '@loopback/repository';
import {Order} from './order.model';
import uuid = require('uuid');

@model()
export class User extends Entity {
  constructor(data?: Partial<User>) {
    super(data);
  }

  @property({
    type: 'string',
    required: true,
  })
  userName: string;

  @property({
    type: 'string',
    id: true,
    default: () => uuid(),
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  avatar?: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'boolean',
    default: false,
  })
  confirmed?: boolean;

  @property({
    type: 'string',
  })
  confirmHash?: string;

  @hasMany(() => Order)
  orders: Order[];
}
