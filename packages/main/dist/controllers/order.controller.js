"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let OrderController = class OrderController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(order, userId) {
        return this.userRepository.orders(userId).create(order);
    }
    async findOrders(userId, filter) {
        const orders = await this.userRepository.orders(userId).find(filter);
        return orders;
    }
};
__decorate([
    rest_1.post('/users/{userId}/orders', {
        responses: {
            '200': {
                description: 'Order model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Order) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Order, {
                    title: 'NewOrder',
                    exclude: ['id'],
                }),
            },
        },
    })),
    __param(1, rest_1.param.path.string('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Order, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    rest_1.get('/users/{userId}/orders', {
        responses: {
            '200': {
                description: "Array of User's Orders",
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Order } },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.path.string('userId')),
    __param(1, rest_1.param.query.string('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOrders", null);
OrderController = __decorate([
    __param(0, repository_1.repository(repositories_1.UserRepository)),
    __metadata("design:paramtypes", [repositories_1.UserRepository])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map