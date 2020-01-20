import {AuthService} from './App';
import {UserController} from './controllers';
import {UserRepository} from './repositories';
import {ConnectionOptions, EntitySchema} from 'typeorm';

export async function main() {
  const dbConfig: ConnectionOptions = {
    type: 'postgres',
    name: process.env.TYPEORM_CONNECTION,
    host: `${process.env.TYPEORM_HOST}`,
    port: Number(`${process.env.TYPEORM_PORT}`),
    username: `${process.env.TYPEORM_USERNAME}`,
    password: `${process.env.TYPEORM_PASSWORD}`,
    database: `${process.env.TYPEORM_DATABASE}`,
    entities: Array(`${process.env.TYPEORM_ENTITIES}`),
    migrations: Array(`${process.env.TYPEORM_MIGRATIONS}`),
    cli: {
      migrationsDir: `${process.env.TYPEORM_MIGRATIONS_DIR}`,
    },
  };

  const app = new AuthService();

  await app.boot(dbConfig);

  app.repository(UserRepository);
  app.addControllers([UserController]);

  await app.start();
}

main();
