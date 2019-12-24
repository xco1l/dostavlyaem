import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { Order, User } from '../models';
import { PostgreDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { UserRepository } from './user.repository';
export declare class OrderRepository extends DefaultCrudRepository<Order, typeof Order.prototype.id> {
    readonly user: BelongsToAccessor<User, typeof Order.prototype.id>;
    constructor(dataSource: PostgreDataSource, userRepositoryGetter: Getter<UserRepository>);
}
