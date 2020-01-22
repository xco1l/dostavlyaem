import {connect} from '../connections';
import {ProductRepository} from '../repositories';

export const getProductRepo = async () => {
  const connection = await connect();
  return connection.getCustomRepository(ProductRepository);
};
