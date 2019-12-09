import {Entity, model, property} from '@loopback/repository';

@model()
export class Goods extends Entity {
  constructor(data?: Partial<Goods>) {
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

export interface GoodsRelations {
  // describe navigational properties here
}

export type GoodsWithRelations = Goods & GoodsRelations;
