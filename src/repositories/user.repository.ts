import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {User, Order} from '../models';
import {PostgreDataSource} from '../datasources';
import {inject} from '@loopback/core';
import {OrderRepository} from './order.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  public orders: HasManyRepositoryFactory<Order, typeof User.prototype.id>;
  constructor(
    @inject('datasources.postgre')
    dataSource: PostgreDataSource,
    @repository(OrderRepository)
    orderRepository: OrderRepository,
  ) {
    super(User, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor(
      'orders',
      async () => orderRepository,
    );
  }
}
