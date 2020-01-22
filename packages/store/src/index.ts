import {Application} from './application';
import {ApplicationConfig} from '@loopback/core';
import {getProductRepo} from '@/db/getters/getProductRepo';
import {getOrderRepo} from '@/db/getters/getOrderRepo';
import {ProductController, OrderController} from './controllers';
export {Application};

export async function main(options: ApplicationConfig = {}) {
  const app = new Application(options);

  const OrderRepository = await getOrderRepo();
  const ProductRepository = await getProductRepo();
  if (!OrderRepository || !ProductRepository) process.exit(0);
  app.bind('repositories.OrderRepository').to(OrderRepository);
  app.bind('repositories.ProductRepository').to(ProductRepository);
  app.controller(ProductController);
  app.controller(OrderController);
  await app.boot();

  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  return app;
}
