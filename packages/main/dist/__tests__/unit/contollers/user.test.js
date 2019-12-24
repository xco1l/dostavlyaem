"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("../../../repositories/user.repository");
const user_controller_1 = require("../../../controllers/user.controller");
const user_model_1 = require("../../../models/user.model");
const jest_create_mock_instance_1 = require("jest-create-mock-instance");
describe('UserController (unit)', () => {
    let userRepository;
    let hasher = {
        hashPassword: jest.fn().mockResolvedValue(Promise.resolve('someHashString')),
        comparePassword: jest.fn(),
    };
    beforeEach(() => {
        userRepository = jest_create_mock_instance_1.default(user_repository_1.UserRepository);
    });
    it('creates user', async () => {
        const controller = new user_controller_1.UserController(userRepository, hasher);
        userRepository.create.mockImplementation((user) => Promise.resolve(new user_model_1.User(user)));
        const user = await controller.create(new user_model_1.User({
            userName: 'Test',
            email: 'test@test.ru',
            password: 'qwerty',
        }));
        expect(userRepository.create).toHaveBeenCalledTimes(1);
        expect(user).toMatchObject({
            userName: 'Test',
            email: 'test@test.ru',
            password: 'someHashString',
            confirmHash: 'someHashString'
        });
    });
    it('search user by id', async () => {
        const controller = new user_controller_1.UserController(userRepository, hasher);
        userRepository.findById.mockResolvedValue(new user_model_1.User({
            userName: 'Test',
            email: 'test@test.ru',
            id: 'someIdString'
        }));
        const user = await controller.findById('someIdString');
        expect(user).toMatchObject({
            userName: 'Test',
            email: 'test@test.ru',
            id: 'someIdString',
        });
        expect(userRepository.findById).toHaveBeenCalledWith('someIdString', undefined);
        expect(userRepository.findById).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=user.test.js.map