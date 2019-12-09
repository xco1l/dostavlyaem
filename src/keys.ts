import {BindingKey} from '@loopback/context';

import {PasswordHasher} from './services/hash.password';

export namespace PasswordHasherBinding {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  );
}
