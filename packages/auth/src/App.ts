import * as bodyParser from 'body-parser';
import {Server, BootOptions} from 'core/Server';

export class AuthService extends Server {
  private readonly START_MSG =
    'OvernightJS with standard express router started on port: ';

  constructor(options?: BootOptions) {
    super();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.bootOptions = {...this.bootOptions, ...options};
  }

  public async start(port?: number) {
    await this.boot();
    port = port || 3000;
    this.app.listen(port, () => {
      console.log(this.START_MSG + port);
    });
  }
}
