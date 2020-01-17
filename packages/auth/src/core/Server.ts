import 'reflect-metadata';
import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import {createConnection, Connection, ObjectType} from 'typeorm';
import {container} from './IoC-container';
import {KEYS} from './keys';

type Controller = InstanceType<any>;
type RouterLib = (options?: any) => any;

interface Class<T> {
  new (...args): T;
  [key: string]: any;
}

interface IRouterAndPath {
  basePath: string | null;
  router: Router | null;
}

export class Server {
  private readonly _app: Application;

  private container = container;
  protected bind = this.container.bind;
  private get = this.container.get;

  constructor() {
    this._app = express();
  }

  protected get app(): Application {
    return this._app;
  }

  public addControllers(
    controllers: Controller[],
    routerLib?: RouterLib,
  ): void {
    const routerLibrary = routerLib || Router;
    controllers.forEach((controller: Controller) => {
      if (controller) {
        controller = this.get(`controller.${controller.name}`);
        const {basePath, router} = this.getRouter(routerLibrary, controller);
        if (basePath && router) {
          this.app.use(basePath, router);
        }
      }
    });
  }

  private getRouter(Router, controller: Controller): IRouterAndPath {
    const prototype = Reflect.getPrototypeOf(controller);
    const options = Reflect.getOwnMetadata('OPTIONS', prototype);

    let router: any;
    if (options) router = Router(options);
    else router = Router();

    const basePath = Reflect.getMetadata('BASE_PATH', prototype);
    if (!basePath) {
      return {
        basePath: null,
        router: null,
      };
    }

    let members = Object.getOwnPropertyNames(prototype);
    members.forEach(member => {
      const route = controller[member];
      const routeProperties = Reflect.getMetadata(member, prototype);
      if (route && routeProperties) {
        const {httpVerb, path} = routeProperties;

        let callBack = (req: Request, res: Response, next: NextFunction) => {
          return controller[member](req, res, next);
        };
        router[httpVerb](path, callBack);
      }
    });

    return {
      basePath,
      router,
    };
  }

  public async repository<T>(repo: ObjectType<T>) {
    const connection: Connection = this.get(KEYS.POSTGRES_KEY);
    const repository = connection.getCustomRepository(repo);
    this.bind(`repository.${repo.name}`).to(repository);
  }

  private _connectDB(config) {
    return createConnection(config);
  }

  public async boot(dbConfig) {
    const connection = await this._connectDB(dbConfig);
    await connection.synchronize();
    await connection.runMigrations();
    this.bind(KEYS.POSTGRES_KEY).to(connection);
  }
}
