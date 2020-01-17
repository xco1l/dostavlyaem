import {hash as bcryptHash, compare as BcryptCompare} from 'bcrypt';

const BCRYPT_ROUNDS: number = 10;

export interface PasswordHasher<T = string> {
  createHash(password: T): Promise<T>;
  comparePassword(providedPass: T, storedPass: T): Promise<boolean>;
}

export class BcryptHasher implements PasswordHasher<string> {
  async createHash(password: string): Promise<string> {
    return bcryptHash(password, BCRYPT_ROUNDS);
  }

  async comparePassword(
    providedPass: string,
    storedPass: string,
  ): Promise<boolean> {
    return BcryptCompare(providedPass, storedPass);
  }
}
