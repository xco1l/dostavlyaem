import { Filter } from '@loopback/repository';
import { Order } from '../models';
import { UserRepository } from '../repositories';
export declare class OrderController {
    userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    create(order: Order, userId: string): Promise<Order>;
    findOrders(userId: string, filter?: Filter<Order>): Promise<Order[]>;
}
