import {hash as bcryptHash, compare} from 'bcrypt';
import {inject} from '@loopback/core';

export type HashPassword = (
  password: string,
  rounds: number,
) => Promise<string>;

export async function hashPassword(
  password: string,
  rounds: number,
): Promise<string> {
  return bcryptHash(password, rounds);
}

export interface PasswordHasher<T = string> {
  hashPassword(password: T): Promise<T>;
  comparePassword(providedPass: T, storedPass: T): Promise<boolean>;
}

export class BcryptHasher implements PasswordHasher<string> {
  constructor(
    @inject('services.hasher.rounds')
    private readonly rounds: number,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcryptHash(password, this.rounds);
  }

  async comparePassword(
    providedPass: string,
    storedPass: string,
  ): Promise<boolean> {
    const isMatched = await compare(providedPass, storedPass);
    return isMatched;
  }
}
