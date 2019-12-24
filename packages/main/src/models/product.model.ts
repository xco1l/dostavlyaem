import {Entity, model, property} from '@loopback/repository';

@model()
export class Product extends Entity {
  constructor(data?: Partial<Product>) {
    super(data);
  }

  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuidv4',
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
