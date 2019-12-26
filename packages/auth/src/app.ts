import * as bodyParser from 'body-parser';
import {UserController} from 'controllers/UserController';
import {Server} from 'core/Server';

class AuthService extends Server {
  private readonly START_MSG =
    'OvernightJS with standard express router started on port: ';

  constructor() {
    super();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.setupControllers();
  }

  private setupControllers(): void {
    super.addControllers(UserController);
  }

  public start(port?: number): void {
    port = port || 3000;
    this.app.listen(port, () => {
      console.log(this.START_MSG + port);
    });
  }
}

const server = new AuthService();

server.start();
