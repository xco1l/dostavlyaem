import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';

import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence} from './sequence';
import {PasswordHasherBinding} from './keys';
import {BcryptHasher} from './services';

export class Application extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    const dbConfig = {
      name: 'postgre',
      connector: 'postgresql',
      host: `${process.env.DB_HOST}`,
      port: `${process.env.DB_PORT}`,
      user: `${process.env.DB_USER}`,
      password: `${process.env.DB_PASS}`,
      database: `${process.env.DB_NAME}`,
      ssl: false,
    };

    this.bind('datasources.config.Postgre').to(dbConfig);
    this.setUpBindigs();
    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  setUpBindigs(): void {
    this.bind(PasswordHasherBinding.ROUNDS).to(10);
    this.bind(PasswordHasherBinding.PASSWORD_HASHER).toClass(BcryptHasher);
  }
}
