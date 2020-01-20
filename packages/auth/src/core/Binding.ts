import 'reflect-metadata';

export enum BindingType {
  CLASS = 'CLASS',
  SINGLETON = 'SINGLETON',
  INSTANCE = 'INSTANCE',
}

export class Binding {
  public readonly key: string;
  public type?: string;
  public valueConstructor;
  public instance: any;

  constructor(key: string) {
    this.key = key;
  }

  static bind(key) {
    return new Binding(key);
  }

  toClass(ctor): this {
    this.type = BindingType.CLASS;
    this.valueConstructor = ctor;
    return this;
  }

  toSingleton(ctor): this {
    this.type = BindingType.SINGLETON;
    this.valueConstructor = ctor;
    return this;
  }

  to(value) {
    this.type = BindingType.INSTANCE;
    this.instance = value;
    return this;
  }
}
