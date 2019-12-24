"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const BCRYPT_ROUNDS = 10;
async function hashPassword(password, rounds) {
    return bcrypt_1.hash(password, rounds);
}
exports.hashPassword = hashPassword;
class BcryptHasher {
    async hashPassword(password) {
        return bcrypt_1.hash(password, BCRYPT_ROUNDS);
    }
    async comparePassword(providedPass, storedPass) {
        return bcrypt_1.compare(providedPass, storedPass);
    }
}
exports.BcryptHasher = BcryptHasher;
//# sourceMappingURL=hash.password.js.map