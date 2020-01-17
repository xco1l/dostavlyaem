import {EntityRepository, EntityManager, Repository} from 'typeorm';
import {User} from '../entities/User';

@EntityRepository(User)
export class UserRepository {
  constructor(private manager: EntityManager) {}
  createAndSave(userCreditionals: User): Promise<User> {
    const user = new User();
    user.email = userCreditionals.email;
    user.password = userCreditionals.password;
    user.userName = userCreditionals.userName;
    return this.manager.save(user);
  }

  findById(id: string) {
    return this.manager.findOne(User, {id});
  }
}
