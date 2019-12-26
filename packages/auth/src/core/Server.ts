import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';

type Controller = InstanceType<any>;
type RouterLib = (options?: any) => any;

interface IRouterAndPath {
  basePath: string | null;
  router: Router | null;
}

export class Server {
  private readonly _app: Application;

  constructor() {
    this._app = express();
  }

  protected get app(): Application {
    return this._app;
  }

  protected addControllers(
    controllers: Controller | Controller[],
    routerLib?: RouterLib,
  ): void {
    controllers = controllers instanceof Array ? controllers : [controllers];
    const routerLibrary = routerLib || Router;
    controllers.forEach((controller: Controller) => {
      if (controller) {
        const {basePath, router} = this.getRouter(routerLibrary, controller);
        if (basePath && router) {
          this.app.use(basePath, router);
        }
      }
    });
  }

  protected getRouter(
    routerLibrary: RouterLib,
    controller: Controller,
  ): IRouterAndPath {
    const prototype = controller.prototype;
    const options = Reflect.getOwnMetadata('OPTIONS', prototype);

    let router: any;
    if (options) router = routerLibrary(options);
    else router = routerLibrary();

    const basePath = Reflect.getOwnMetadata('BASE_PATH', prototype);
    if (!basePath) {
      return {
        basePath: null,
        router: null,
      };
    }

    let members = Object.getOwnPropertyNames(controller);
    members = members.concat(Object.getOwnPropertyNames(prototype));
    members.forEach(member => {
      const route = prototype[member];
      const routeProperties = Reflect.getOwnMetadata(member, prototype);
      if (route && routeProperties) {
        const {httpVerb, path} = routeProperties;

        let callBack = (req: Request, res: Response, next: NextFunction) => {
          return prototype[member](req, res, next);
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
