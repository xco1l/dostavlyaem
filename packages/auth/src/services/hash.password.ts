import {hash as bcryptHash, compare as BcryptCompare} from 'bcrypt';

const BCRYPT_ROUNDS: number = 10;

export interface PasswordHasher {
  createHash(password: string): Promise<string>;
  compareHashes(providedPass: string, storedPass: string): Promise<boolean>;
}

export class BcryptHasher implements PasswordHasher {
  async createHash(password: string): Promise<string> {
    return bcryptHash(password, BCRYPT_ROUNDS);
  }

  async compareHashes(
    providedPass: string,
    storedPass: string,
  ): Promise<boolean> {
    return BcryptCompare(providedPass, storedPass);
  }
}
