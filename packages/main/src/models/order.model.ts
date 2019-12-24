import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {CartItem} from './cart-item.model';

@model()
export class Order extends Entity {
  constructor(data?: Partial<Order>) {
    super(data);
  }

  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property.array(CartItem, {required: true})
  Cart: Array<CartItem>;

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
