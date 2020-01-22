import 'reflect-metadata';
import {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
  RouterOptions,
  default as express,
} from 'express';
import {container, Class} from './IoC-container';

interface IRouterAndPath {
  basePath: string | null;
  router: Router | null;
}

export class Server {
  private readonly _app: Application;

  private container = container;
  public bind = this.container.bind;
  private get = this.container.get;

  constructor() {
    this._app = express();
  }

  protected get app(): Application {
    return this._app;
  }

  public addControllers(controllers: Class<any>[]): void {
    controllers.forEach(<T>(controller: Class<T>) => {
      if (controller) {
        controller = this.get(`controller.${controller.name}`);
        const {basePath, router} = this.getRouter(Router, controller);
        if (basePath && router) {
          this.app.use(basePath, router);
        }
      }
    });
  }

  private getRouter<T>(Router, controller: Class<T>): IRouterAndPath {
    const prototype = Reflect.getPrototypeOf(controller);
    const options: RouterOptions = Reflect.getOwnMetadata('OPTIONS', prototype);
    let router: Router;
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
}
