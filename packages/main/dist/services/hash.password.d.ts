export declare type HashPassword = (password: string, rounds: number) => Promise<string>;
export declare function hashPassword(password: string, rounds: number): Promise<string>;
export interface PasswordHasher<T = string> {
    hashPassword(password: T): Promise<T>;
    comparePassword(providedPass: T, storedPass: T): Promise<boolean>;
}
export declare class BcryptHasher implements PasswordHasher<string> {
    hashPassword(password: string): Promise<string>;
    comparePassword(providedPass: string, storedPass: string): Promise<boolean>;
}
