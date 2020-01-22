import {EntityRepository, AbstractRepository} from 'typeorm';
import {Order} from '../entities';
import {User} from '../entities';

@EntityRepository(Order)
export class OrderRepository extends AbstractRepository<Order> {
  save(user: User, order: Order) {
    order.user = user;
    return this.repository.save(order);
  }

  async findAll(userId: string) {
    const user = await this.manager.find('User', {
      where: {id: userId},
      relations: ['orders'],
    });

    if (user.length) return (user[0] as User).orders;

    return null;
  }
}
