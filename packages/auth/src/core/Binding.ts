import 'reflect-metadata';
import {Class} from './IoC-container';

export enum BindingType {
  CLASS = 'CLASS',
  SINGLETON = 'SINGLETON',
  INSTANCE = 'INSTANCE',
}

export class Binding {
  public readonly key: string;
  public type: BindingType;
  public valueConstructor: Class<any>;
  public instance: any;

  constructor(key: string) {
    this.key = key;
  }

  static bind(key: string) {
    return new Binding(key);
  }

  toClass<T>(ctor: Class<T>): this {
    this.type = BindingType.CLASS;
    this.valueConstructor = ctor;
    return this;
  }

  toSingleton<T>(ctor: Class<T>): this {
    this.type = BindingType.SINGLETON;
    this.valueConstructor = ctor;
    return this;
  }

  to<T>(value: T): this {
    this.type = BindingType.INSTANCE;
    this.instance = value;
    return this;
  }
}
