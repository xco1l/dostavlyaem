import { Entity } from '@loopback/repository';
export declare class Product extends Entity {
    constructor(data?: Partial<Product>);
    id?: string;
    name: string;
    price: number;
}
