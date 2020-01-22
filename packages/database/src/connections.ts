import {config} from '../ormconfig';
import {createConnection, getConnection, Connection} from 'typeorm';

export const connect = async () => {
  let connection: Connection;
  try {
    connection = getConnection();
  } catch (err) {
    connection = await createConnection(config);
  }
  return connection;
};
