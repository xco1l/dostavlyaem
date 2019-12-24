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
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const user_model_1 = require("./user.model");
const cart_item_model_1 = require("./cart-item.model");
let Order = class Order extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        defaultFn: 'uuidv4',
    }),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    repository_1.property.array(cart_item_model_1.CartItem, { required: true }),
    __metadata("design:type", Array)
], Order.prototype, "Cart", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        default: new Date(),
    }),
    __metadata("design:type", String)
], Order.prototype, "createdAt", void 0);
__decorate([
    repository_1.property({
        type: 'object',
        required: true,
    }),
    __metadata("design:type", String)
], Order.prototype, "deliveryAddress", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Order.prototype, "contactPhone", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    __metadata("design:type", Number)
], Order.prototype, "cost", void 0);
__decorate([
    repository_1.belongsTo(() => user_model_1.User),
    __metadata("design:type", String)
], Order.prototype, "userId", void 0);
Order = __decorate([
    repository_1.model(),
    __metadata("design:paramtypes", [Object])
], Order);
exports.Order = Order;
//# sourceMappingURL=order.model.js.map