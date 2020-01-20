import * as bodyParser from 'body-parser';
import {Server} from './core/Server';
import pino, {Logger} from 'pino';
import {BcryptHasher} from './services/hash.password';

export class AuthService extends Server {
  private readonly START_MSG = 'App started on port: ';
  private readonly pino: Logger;
  constructor() {
    super();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.setUpBindings();
    this.pino = pino();
  }

  public async start() {
    const port = Number(process.env.APP_PORT) || 3000;
    this.app.listen(port, () => {
      this.pino.info(this.START_MSG + port);
    });
  }

  private setUpBindings() {
    this.bind('service.hasher').toClass(BcryptHasher);
  }
}
