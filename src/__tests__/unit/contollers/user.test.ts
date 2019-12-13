import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';

import {UserRepository} from '../../../repositories';
import {UserController} from '../../../controllers';
import {BcryptHasher} from '../../../services';
import {User} from '../../../models';

describe('UserController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<UserRepository>;
  let hasher: BcryptHasher = {
    hashPassword: sinon
      .stub(BcryptHasher.prototype, 'hashPassword')
      .callsFake(() => new Promise((res: any) => res('someHashString'))),
    comparePassword: sinon.stub(),
  };
  beforeEach(givenStubbedRepository);

  describe('create()', () => {
    it('creates user', async () => {
      const controller = new UserController(repository, hasher);

      repository.stubs.create.resolves(
        new User({
          userName: 'Test',
          email: 'test@test.ru',
          password: 'someHashString',
        }),
      );

      const users = await controller.create(
        new User({
          userName: 'Test',
          email: 'test@test.ru',
          password: 'qwerty',
        }),
      );

      expect(users).to.containEql({
        userName: 'Test',
        email: 'test@test.ru',
        password: 'someHashString',
      });

      sinon.assert.calledWithMatch(repository.stubs.create, {
        userName: 'Test',
        password: 'someHashString',
        email: 'test@test.ru',
      });
    });
  });

  describe('findById()', () => {
    it('finds user', async () => {
      const controller = new UserController(repository, hasher);

      repository.stubs.findById.resolves(
        new User({
          userName: 'Test',
          email: 'test@test.ru',
          password: 'someHashString',
          id: 'someIdString',
        }),
      );

      const user = await controller.findById('someIdString');

      expect(user).to.containEql({
        id: 'someIdString',
      });

      sinon.assert.calledWithMatch(repository.stubs.findById, 'someIdString');
    });
  });

  function givenStubbedRepository() {
    repository = createStubInstance(UserRepository);
  }
});
