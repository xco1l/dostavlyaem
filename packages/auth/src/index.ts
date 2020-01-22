import {AuthService} from 'App';
import {UserController} from 'controllers';
import {getUserRepo} from '@/db/getters/getUserRepo';
export async function main() {
  const app = new AuthService();

  const UserRepository = await getUserRepo();
  app.bind('repositories.UserRepository').to(UserRepository);

  app.addControllers([UserController]);
  await app.start();
}

main();
