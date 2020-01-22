import {connect} from '../connections';
import {OrderRepository} from '../repositories';

export const getOrderRepo = async () => {
  const connection = await connect();
  return connection.getCustomRepository(OrderRepository);
};
