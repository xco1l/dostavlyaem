import {ConnectionOptions} from 'typeorm';

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dostavlyaem-app',
  password: 'ghjcnjgfhjkm',
  database: 'dostavlyaem-db',
  entities: [__dirname + '/src/entities/*.ts'],
  migrations: [__dirname + '/src/migration/*.ts'],
};
