import {UserController} from '../../../controllers/user.controller';
import {User} from '../../../models/user.model';

const userRepositoryMock: any = {
  create: jest.fn(({...args}) => {
    return {...args, getId: jest.fn()};
  }),
};
const hasherServiceMock: any = {
  hashPassword: jest.fn(() => 'someHashString'),
  comparePasswod: jest.fn(() => 'trueOrFalse'),
};

describe('UserController', async () => {
  let userControllerInstance: UserController;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  userControllerInstance = new UserController(
    userRepositoryMock,
    hasherServiceMock,
  );

  it('Instance have a CRUD functions', () => {
    expect(userControllerInstance).toHaveProperty('create');

    expect(userControllerInstance).toHaveProperty('find');

    expect(userControllerInstance).toHaveProperty('updateById');

    expect(userControllerInstance).toHaveProperty('deleteById');
  });

  let userFromRequest = new User({
    userName: 'Test',
    email: 'Test@test.ru',
    password: 'qwerty123',
  });
  it('Creates user correctly', async () => {
    const User = await userControllerInstance.create(userFromRequest);

    expect(User.password).toBe('someHashString');
    expect(User.userName).toBe('Test');
    expect(User.email).toBe('Test@test.ru');
  });
});
