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
  let hasher: BcryptHasher;
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

  function givenStubbedRepository() {
    repository = createStubInstance(UserRepository);
    hasher = {
      hashPassword: sinon
        .stub(BcryptHasher.prototype, 'hashPassword')
        .callsFake(() => new Promise((res: any) => res('someHashString'))),
      comparePassword: sinon.stub(),
    };
  }
});
