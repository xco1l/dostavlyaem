import {inject} from 'core/IoC-container';
import {Controller, Get} from 'core/expressDecorators';
import {Request, Response} from 'express';
import {Test} from '../App';

@Controller('users')
export class UserController {
  constructor(
    @inject('Test') protected test: Test,
    @inject('Test') protected test2: Test,
  ) {}

  @Get(':id')
  protected getById(req: Request, res: Response) {
    this.test.log();
    this.test2.log();
    return res.status(200).send(`Hello ${req.params.id}`);
  }
}
