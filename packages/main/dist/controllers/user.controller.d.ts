import { Filter } from '@loopback/repository';
import { PasswordHasher } from '../services/hash.password';
import { User } from '../models';
import { UserRepository } from '../repositories';
export declare class UserController {
    userRepository: UserRepository;
    private hasher;
    constructor(userRepository: UserRepository, hasher: PasswordHasher);
    create(user: Omit<User, 'id'>): Promise<User>;
    find(filter?: Filter<User>): Promise<User[]>;
    findById(id: string, filter?: Filter<User>): Promise<User>;
    updateById(id: string, user: User): Promise<void>;
    replaceById(id: string, user: User): Promise<void>;
    deleteById(id: string): Promise<void>;
}
