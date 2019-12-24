import {User} from '../models';
import {Test} from 'mocha';

export const givenUser = (user?: Partial<User>) => {
  const data = Object.assign(
    {
      userName: Test,
      password: 'qwerty123',
      email: 'test@test.ru',
    },
    user,
  );
  return new User(data);
};
