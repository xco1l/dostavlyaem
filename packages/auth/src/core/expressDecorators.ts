import 'reflect-metadata';
import {container} from './IoC-container';
type Controller = InstanceType<any>;

export function Get(path?: string): MethodDecorator {
  return routesHelper('get', path);
}

export function Post(path?: string): MethodDecorator {
  return routesHelper('post', path);
}

export function Delete(path?: string): MethodDecorator {
  return routesHelper('delete', path);
}

export function routesHelper(httpVerb: string, path?: string): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor?: PropertyDescriptor,
  ) => {
    let routePropperties = Reflect.getOwnMetadata(propertyKey, target);

    if (!routePropperties) routePropperties = {};

    routePropperties = {
      httpVerb,
      path: path ? '/' + path : '',
      ...routePropperties,
    };
    Reflect.defineMetadata(propertyKey, routePropperties, target);
    if (descriptor) return descriptor;
  };
}

export function Controller(path: string): ClassDecorator {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata('BASE_PATH', '/' + path, target.prototype);
    container.bind(`controller.${target.name}`).toSingleton(target);
    return target;
  };
}
