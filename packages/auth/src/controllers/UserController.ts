import {inject} from '../core/IoC-container';
import {Controller, Get, Post} from '../core/expressDecorators';
import {Request, Response} from 'express';
import {UserRepository} from '../repositories';

@Controller('users')
export class UserController {
  constructor(
    @inject('repository.UserRepository') protected userRepo: UserRepository,
  ) {}

  @Get(':id')
  protected async getById(req: Request, res: Response) {
    const user = await this.userRepo.findById(req.params.id);
    return res.status(200).send(`Hello ${user.userName}`);
  }

  @Post()
  protected async createUser(req: Request, res: Response) {
    const user = await this.userRepo.createAndSave(req.body);
    return res.status(200).send(
      `User '${user.userName}' successfully created'. Creditionals: ${{
        user,
      }}`,
    );
  }
}
