import {Entity, model, property} from '@loopback/repository';

@model()
export class Products extends Entity {
  constructor(data?: Partial<Products>) {
    super(data);
  }

  @property({
    type: 'string',
    id: true,
    generated: true,
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

export interface ProductsRelations {
  // describe navigational properties here
}

export type ProductsWithRelations = Products & ProductsRelations;
