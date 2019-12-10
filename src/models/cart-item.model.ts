import {Entity, model, property} from '@loopback/repository';

@model()
export class CartItem extends Entity {
  constructor(data?: Partial<CartItem>) {
    super(data);
  }

  @property({
    type: 'string',
    required: true,
  })
  productId: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;
}
