import 'reflect-metadata';
import {Binding} from './Binding';

export const PARAMETER_KEY = 'injection:param';

class DContainer {
  constructor() {
    this.bind = this.bind.bind(this);
    this.get = this.get.bind(this);
  }
  private instances: Map<string, Binding> = new Map();

  public bind(key: string) {
    const instance = Binding.bind(key);
    this.instances.set(key, instance);
    return instance;
  }

  public get(key: string) {
    const binding = this.instances.get(key);
    return binding.resolve();
  }
}

export const container = new DContainer();

export function inject(bindKey: string): ParameterDecorator {
  return (target: any, _: string | symbol, index: number) => {
    const meta = Reflect.getOwnMetadata(PARAMETER_KEY, target);
    if (meta) {
      mergeOwnMeta(meta, [{bindKey, index, target}], target);
    } else
      Reflect.defineMetadata(PARAMETER_KEY, [{bindKey, index, target}], target);
  };
}

function mergeOwnMeta(ownMeta: Array<any>, newMeta: Array<any>, target: any) {
  Reflect.defineMetadata(PARAMETER_KEY, ownMeta.concat(newMeta), target);
}

export function hasInjections(target: any): boolean {
  return !!Reflect.getOwnMetadata(PARAMETER_KEY, target);
}
