import * as bodyParser from 'body-parser';
import {Server} from './core/Server';
import pino, {Logger} from 'pino';

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

  public async start(port?: number) {
    port = port || 3000;
    this.app.listen(port, () => {
      this.pino.info(this.START_MSG + port);
    });
  }

  private setUpBindings() {
    //some bindings
  }
}
