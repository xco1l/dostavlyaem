import 'reflect-metadata';
import {Binding, BindingType} from './Binding';

export const PARAMETER_KEY = 'injection:param';

export type Constructor<T> = new (...args: any[]) => T;

export interface parameterInjection {
  target: Constructor<any>;
  index: number;
  bindKey: string;
}
class DContainer {
  constructor() {
    this.bind = this.bind.bind(this);
    this.get = this.get.bind(this);
  }
  public instances: Map<string, Binding> = new Map();

  public bind(key: string) {
    const instance = Binding.bind(key);
    this.instances.set(key, instance);
    return instance;
  }

  public get(key: string) {
    const binding = this.instances.get(key);
    if (!binding) throw new Error(`No binding found for '${key}' key`);
    return this._resolve(binding);
  }

  private _resolve(binding: Binding) {
    switch (binding.type) {
      case BindingType.CLASS:
        return this._createInstanceFromCtor(binding);
      case BindingType.SINGLETON:
        return this._resolveSingleton(binding);
      case BindingType.INSTANCE:
        return binding.instance;
    }
  }

  private _createInstanceFromCtor(binding: Binding) {
    let instances: parameterInjection[] | [] = [];
    if (hasInjections(binding.valueConstructor)) {
      instances = this._resolveInjectons(binding.valueConstructor);
    }
    return new binding.valueConstructor(...instances);
  }

  private _resolveSingleton(binding: Binding) {
    if (!binding.instance) {
      let instances: parameterInjection[] | [] = [];
      if (hasInjections(binding.valueConstructor)) {
        instances = this._resolveInjectons(binding.valueConstructor);
      }
      binding.instance = new binding.valueConstructor(...instances);
    }

    return binding.instance;
  }

  private _resolveInjectons(target: any): parameterInjection[] {
    const injections: parameterInjection[] = Reflect.getOwnMetadata(
      PARAMETER_KEY,
      target,
    );
    const instances = injections
      .sort((a, b) => a.index - b.index)
      .map(injection => this.get(injection.bindKey));
    return instances;
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
