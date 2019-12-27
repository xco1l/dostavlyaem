import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import 'reflect-metadata';
import fs from 'fs';
import {promisify} from 'util';
import path from 'path';

const readdir = promisify(fs.readdir);

type Controller = InstanceType<any>;
type RouterLib = (options?: any) => any;

interface IRouterAndPath {
  basePath: string | null;
  router: Router | null;
}

export interface BootOptions {
  controllers?: {
    dirs: Array<string>;
    extensions: Array<string>;
    nested: boolean;
  };
}

export class Server {
  private readonly _app: Application;

  constructor() {
    this._app = express();
  }

  protected get app(): Application {
    return this._app;
  }

  //Default options
  protected bootOptions: BootOptions = {
    controllers: {
      dirs: ['controllers'],
      extensions: ['ts'],
      nested: false,
    },
  };

  protected async boot(routerLib?: RouterLib) {
    await this.addControllers(routerLib);
  }

  private async addControllers(routerLib?: RouterLib) {
    const Controllers = await this.pickUpControllers();
    this.setUpControllers(Controllers, routerLib);
  }

  //TODO Make nested dirs scan
  private async pickUpControllers() {
    const Controllers = [];
    const extensions = this.bootOptions.controllers.extensions;
    const dirs = this.bootOptions.controllers.dirs;
    for (const dir of dirs) {
      const scannedModules = await readdir(
        path.resolve(`${__dirname}/../${dir}`),
      );

      for (let module of scannedModules) {
        for (const ext of extensions) {
          if (module.indexOf(ext)) {
            module = await import(`${__dirname}/../${dir}/${module}`);
            const controllerKeys = Object.getOwnPropertyNames(module).filter(
              key => key.indexOf('Controller') >= 0,
            );
            for (const controller of controllerKeys) {
              Controllers.push(module[controller]);
            }
          }
        }
      }
    }
    return Controllers;
  }

  private setUpControllers(
    controllers: Controller[],
    routerLib?: RouterLib,
  ): void {
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

  private getRouter(Router, controller: Controller): IRouterAndPath {
    const prototype = controller.prototype;
    const options = Reflect.getOwnMetadata('OPTIONS', prototype);

    let router: any;
    if (options) router = Router(options);
    else router = Router();

    const basePath = Reflect.getOwnMetadata('BASE_PATH', prototype);
    if (!basePath) {
      return {
        basePath: null,
        router: null,
      };
    }

    let members = Object.getOwnPropertyNames(prototype);

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
