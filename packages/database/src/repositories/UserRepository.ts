import {EntityRepository, AbstractRepository} from 'typeorm';
import {User} from '../entities/User';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  findById(id: string) {
    return this.repository.findOne(id);
  }

  deleteById(id: string) {
    return this.repository.delete(id);
  }

  findAll() {
    return this.repository.find();
  }
}
