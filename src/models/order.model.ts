import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Order extends Entity {
  constructor(data?: Partial<Order>) {
    super(data);
  }

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  Cart: object[];

  @property({
    type: 'string',
    default: new Date(),
  })
  createdAt?: string;

  @property({
    type: 'object',
    required: true,
  })
  deliveryAddress: string;

  @property({
    type: 'string',
    required: true,
  })
  contactPhone: string;

  @property({
    type: 'number',
    required: true,
  })
  cost: number;

  @belongsTo(() => User)
  userId: string;
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
