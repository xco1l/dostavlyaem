import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { User, Order } from '../models';
import { PostgreDataSource } from '../datasources';
import { OrderRepository } from './order.repository';
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id> {
    orders: HasManyRepositoryFactory<Order, typeof User.prototype.id>;
    constructor(dataSource: PostgreDataSource, orderRepository: OrderRepository);
}
