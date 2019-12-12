import {UserController} from '../../../controllers/user.controller';

jest.mock('@loopback/core');
jest.mock('@loopback/repository');
jest.mock('@loopback/rest');

const userRepositoryMock: any = {
  create: jest.fn(),
};
const hasherServiceMock: any = {
  hashPassword: jest.fn(() => 'someHashString'),
  comparePasswod: jest.fn(() => 'trueOrFalse'),
};

describe('UserController', () => {
  let userControllerInstance: UserController;

  beforeEach(() => {
    jest.clearAllMocks();

    userControllerInstance = new UserController(
      userRepositoryMock,
      hasherServiceMock,
    );
  });

  it('Instance have a CRUD functions', () => {
    expect(userControllerInstance).toHaveProperty('create');

    expect(userControllerInstance).toHaveProperty('find');

    expect(userControllerInstance).toHaveProperty('updateById');

    expect(userControllerInstance).toHaveProperty('deleteById');
  });
});
