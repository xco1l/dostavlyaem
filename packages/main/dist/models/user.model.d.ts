import { Entity } from '@loopback/repository';
import { Order } from './order.model';
export declare class User extends Entity {
    constructor(data?: Partial<User>);
    userName: string;
    id?: string;
    email: string;
    avatar?: string;
    password: string;
    confirmed?: boolean;
    confirmHash?: string;
    orders: Order[];
}
