import { Entity } from '@loopback/repository';
export declare class CartItem extends Entity {
    constructor(data?: Partial<CartItem>);
    productId: string;
    quantity: number;
    price: number;
}
