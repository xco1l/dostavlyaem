import * as bodyParser from 'body-parser';
import {Server} from 'core/Server';

export class Test {
  public log() {
    console.log('It works!');
  }
}

export class AuthService extends Server {
  private readonly START_MSG =
    'OvernightJS with standard express router started on port: ';

  constructor() {
    super();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.setUpBindings();
  }

  public async start(port?: number) {
    port = port || 3000;
    this.app.listen(port, () => {
      console.log(this.START_MSG + port);
    });
  }

  private setUpBindings() {
    this.bind('Test').toClass(Test);
  }
}
