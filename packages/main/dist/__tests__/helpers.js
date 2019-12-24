"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const mocha_1 = require("mocha");
exports.givenUser = (user) => {
    const data = Object.assign({
        userName: mocha_1.Test,
        password: 'qwerty123',
        email: 'test@test.ru',
    }, user);
    return new models_1.User(data);
};
//# sourceMappingURL=helpers.js.map