import {Controller, Get} from 'core/IoC-container';
import {Request, Response} from 'express';

@Controller('users')
export class UserController {
  @Get(':id')
  private getById(req: Request, res: Response) {
    return res.status(200).send(`Hello ${req.params.id}`);
  }
}
