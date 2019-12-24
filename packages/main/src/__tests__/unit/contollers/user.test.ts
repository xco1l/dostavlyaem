import {UserRepository} from '../../../repositories/user.repository';
import {UserController} from '../../../controllers/user.controller';
import {PasswordHasher} from '../../../services/hash.password';
import {User} from '../../../models/user.model';
import createMockInstance from 'jest-create-mock-instance';

describe('UserController (unit)', () => {
  let userRepository: jest.Mocked<UserRepository>;
  let hasher: PasswordHasher = {
    hashPassword: jest.fn().mockResolvedValue(Promise.resolve('someHashString')),
    comparePassword: jest.fn(),
  };
  beforeEach(() => {
    userRepository = createMockInstance(UserRepository);
  });

  it('creates user', async () => {
    const controller = new UserController(userRepository, hasher);

    userRepository.create.mockImplementation((user) =>
      Promise.resolve(
        new User(user as any),
      ),
    );
    const user: User = await controller.create(
      new User({
        userName: 'Test',
        email: 'test@test.ru',
        password: 'qwerty',
      }),
    );

    expect(userRepository.create).toHaveBeenCalledTimes(1)

    expect(user).toMatchObject({
      userName: 'Test',
      email: 'test@test.ru',
      password: 'someHashString',
      confirmHash: 'someHashString'
    });
  });

  it('search user by id', async () => {
    const controller = new UserController(userRepository, hasher);

    userRepository.findById.mockResolvedValue(new User({
      userName: 'Test',
      email: 'test@test.ru',
      id: 'someIdString'
    }))

    const user = await controller.findById('someIdString')

    expect(user).toMatchObject({
      userName: 'Test',
      email: 'test@test.ru',
      id: 'someIdString',
    })

    expect(userRepository.findById).toHaveBeenCalledWith('someIdString', undefined)
    expect(userRepository.findById).toHaveBeenCalledTimes(1)
  })
});
