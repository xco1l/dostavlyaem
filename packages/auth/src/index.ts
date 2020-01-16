import {AuthService} from 'App';
import {UserController} from 'controllers';
const app = new AuthService();

app.addControllers([UserController]);

app.start();
