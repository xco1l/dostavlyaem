import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {UserController} from '../../../controllers';
import {User} from '../../../models';
import {UserRepository} from '../../../repositories';
import {givenUser} from '../../helpers';
import {PasswordHasher} from '../../../services';

import {DataObject, AnyObject, Filter} from '@loopback/repository';
describe('UserController', () => {
  let userRepo: StubbedInstanceWithSinonAccessor<UserRepository>,
    hasher: PasswordHasher;

  //Controller methods
  let create: sinon.SinonStub<
      [DataObject<User>, (AnyObject | undefined)?],
      Promise<User>
    >,
    findById: sinon.SinonStub<
      [
        string | undefined,
        (Filter<User> | undefined)?,
        (AnyObject | undefined)?,
      ],
      Promise<User>
    >,
    find: sinon.SinonStub<
      [(Filter<User> | undefined)?, (AnyObject | undefined)?],
      Promise<User[]>
    >,
    replaceById: sinon.SinonStub<
      [string | undefined, DataObject<User>, (AnyObject | undefined)?],
      Promise<void>
    >,
    updateById: sinon.SinonStub<
      [string | undefined, DataObject<User>, (AnyObject | undefined)?],
      Promise<void>
    >,
    deleteById: sinon.SinonStub<
      [string | undefined, (AnyObject | undefined)?],
      Promise<void>
    >;

  let controller: UserController,
    aUser: User,
    aUserWithId: User,
    aChangedUser: User,
    aListOfUser: User[];

  describe('create a user', () => {
    it('creates a user', async () => {
      create.resolves(aUserWithId);
      const result = await controller.create(aUser);
      expect(result).to.eql(aUserWithId);
      sinon.assert.calledWith(create, aUser);
    });
  });

  function resetRepositories() {
    userRepo = createStubInstance(UserRepository);
    aUser = givenUser();
    aUserWithId = givenUser({
      id: 'someRandomString',
    });
    aListOfUser = [
      aUserWithId,
      givenUser({
        id: 'anotherRndString',
        userName: 'Test 2',
        email: 'test2@test.ru',
        password: 'qwerty321',
      }),
    ] as User[];
    aChangedUser = givenUser({
      id: aUserWithId.id,
      userName: 'Test Testovich Testov',
    });

    ({
      create,
      findById,
      find,
      replaceById,
      updateById,
      deleteById,
    } = userRepo.stubs);

    hasher = {
      hashPassword: sinon.stub(),
      comparePassword: sinon.stub(),
    };
    controller = new UserController(userRepo, hasher);
  }
});
