import {connect} from '../connections';
import {UserRepository} from '../repositories';

export const getUserRepo = async () => {
  const connection = await connect();
  return connection.getCustomRepository(UserRepository);
};
