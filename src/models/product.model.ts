import {Entity, model, property} from '@loopback/repository';
import uuid = require('uuid');

@model()
export class Product extends Entity {
  constructor(data?: Partial<Product>) {
    super(data);
  }

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
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;
}
