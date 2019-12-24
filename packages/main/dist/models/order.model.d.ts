import { Entity } from '@loopback/repository';
import { CartItem } from './cart-item.model';
export declare class Order extends Entity {
    constructor(data?: Partial<Order>);
    id?: string;
    Cart: Array<CartItem>;
    createdAt?: string;
    deliveryAddress: string;
    contactPhone: string;
    cost: number;
    userId: string;
}
