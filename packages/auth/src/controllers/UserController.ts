import {inject} from '../core/IoC-container';
import {Controller, Get, Post, Delete} from '../core/expressDecorators';
import {Request, Response} from 'express';
import {UserRepository} from '@/db/repositories';
import {BcryptHasher} from '../services/hash.password';
import {User} from '@/db/entities';

@Controller('users')
export class UserController {
  constructor(
    @inject('repositories.UserRepository') protected userRepo: UserRepository,
    @inject('service.hasher') protected hasher: BcryptHasher,
  ) {}

  @Get('all')
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userRepo.findAll();
      return res.json(users);
    } catch (err) {
      res.status(500).json({message: 'Error'});
      throw new Error(err);
    }
  }

  @Post()
  async createUser(req: Request, res: Response) {
    try {
      const userCreditionals: Omit<User, 'id'> = req.body;
      let savedUser = await this.userRepo.save({
        ...new User(),
        ...userCreditionals,
      });
      savedUser.password = await this.hasher.createHash(savedUser.password);
      savedUser.confirmHash = await this.hasher.createHash(savedUser.id);
      savedUser = await this.userRepo.save(savedUser);

      res
        .status(200)
        .send(
          `User '${
            savedUser.userName
          }' successfully created'. Creditionals: ${JSON.stringify(savedUser)}`,
        );

      return savedUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  @Delete(':id')
  async deleteById(req: Request, res: Response) {
    const id = req.params.id;
    const user = await this.userRepo.findById(id);
    if (!user) {
      return res.status(404).json({message: 'Not found'});
    } else {
      try {
        const result = await this.userRepo.deleteById(id);
        if (result.affected) {
          return res.status(200).json({message: 'Success'});
        } else {
          return res.status(500).json({message: 'Error'});
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  @Get(':id')
  async getById(req: Request, res: Response) {
    const user = await this.userRepo.findById(req.params.id);
    if (!user) return res.status(404).json({message: 'Not found', user: null});
    return res.status(200).json({message: 'Success', user});
  }
}

export interface responseGetUserI {
  message: string;
  user: User | null;
}
