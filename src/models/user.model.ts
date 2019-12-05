import {Model, model, property} from '@loopback/repository';

@model()
export class User extends Model {
  constructor(data?: Partial<User>) {
    super(data);
  }

  @property({
    type: 'string',
    required: true,
  })
  userName: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

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
    required: true,
    default: false,
  })
  confirmed: boolean;

  @property({
    type: 'string',
  })
  confirm_hash?: string;
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
