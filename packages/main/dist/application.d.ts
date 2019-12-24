import { ApplicationConfig } from '@loopback/core';
import { RestApplication } from '@loopback/rest';
declare const Application_base;
export declare class Application extends Application_base {
    constructor(options?: ApplicationConfig);
    setUpBindigs(): void;
}
export {};
