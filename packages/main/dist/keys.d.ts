import { BindingKey } from '@loopback/context';
import { PasswordHasher } from './services/hash.password';
export declare namespace PasswordHasherBinding {
    const PASSWORD_HASHER: BindingKey<PasswordHasher<string>>;
}
