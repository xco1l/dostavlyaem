import {UserRepository} from '@/db/repositories/UserRepository';
import {UserController} from 'controllers/UserController';
import {PasswordHasher} from 'services/hash.password';
import {User} from '@/db/entities/User';
import {Response, Request} from 'express';
import MockExpressRequest from 'mock-express-request';
import MockExpressResponse from 'mock-express-response';
import createMockInstance from 'jest-create-mock-instance';

describe('UserController (unit)', () => {
  let userRepository: jest.Mocked<UserRepository>;
  let res: jest.Mocked<Response>;
  let req: jest.Mocked<Request>;

  const hasher: PasswordHasher = {
    createHash: jest.fn().mockResolvedValue(Promise.resolve('someHashString')),
    compareHashes: jest.fn(),
  };
  beforeEach(() => {
    res = new MockExpressResponse({
      body: {},
    });
    req = new MockExpressRequest();
    userRepository = createMockInstance(UserRepository);
  });

  it('Creates user', async () => {
    const controller = new UserController(userRepository, hasher);

    userRepository.save.mockImplementation((user: User) =>
      Promise.resolve({...new User(), ...user}),
    );

    const userCreditonals: Omit<User, 'id'> = {
      userName: 'Test',
      email: 'test@test.ru',
      password: 'qwerty',
    };

    req.body = userCreditonals;

    const user = await controller.createUser(req, res);

    expect(userRepository.save).toHaveBeenCalledTimes(2);

    expect(user).toMatchObject({
      userName: 'Test',
      email: 'test@test.ru',
      password: 'someHashString',
      confirmHash: 'someHashString',
    });
  });
});
