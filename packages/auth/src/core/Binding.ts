import 'reflect-metadata';

export class Binding {
  public readonly key: string;
  private _type?: string;
  private _valueConstructor;

  constructor(key: string) {
    this.key = key;
  }

  static bind(key) {
    return new Binding(key);
  }

  toClass(ctor): this {
    this._type = 'CLASS';
    this._valueConstructor = ctor;
    return this;
  }

  public resolve() {
    switch (this._type) {
      case 'CLASS':
        return this._createInstanceFromCtor(this._valueConstructor);
    }
  }

  private _createInstanceFromCtor(ctor) {
    return new ctor();
  }
}
