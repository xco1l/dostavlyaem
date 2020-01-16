import 'reflect-metadata';
import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import {Repository} from 'typeorm';
import {container, PARAMETER_KEY, hasInjections} from './IoC-container';

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
        if (hasInjections(controller)) {
          controller = this.resolveInjections(controller);
        } else controller = new controller();
        const {basePath, router} = this.getRouter(routerLibrary, controller);
        if (basePath && router) {
          this.app.use(basePath, router);
        }
      }
    });
  }

  private resolveInjections(target: any) {
    let injections = Reflect.getOwnMetadata(PARAMETER_KEY, target);
    if (injections) {
      injections = injections.map(injection => {
        if (hasInjections(this.get(injection.bindKey))) {
          return this.resolveInjections(this.get(injection.bindKey));
        }

        return this.get(injection.bindKey);
      });
      const instance = new target(...injections);
      return instance;
    }
    return new target();
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

  public repository(repo: Class<Repository<any>>, bindOption: string) {
    Reflect.defineMetadata(bindOption, repo.prototype, Server.prototype);
  }
}
