import {hash as bcryptHash, compare} from 'bcrypt';

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
  rounds: number;
  constructor() {
    this.rounds = 10;
  }

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
