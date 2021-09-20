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
exports.QuickEventResolver = void 0;
const QuickEvent_1 = require("../entities/QuickEvent");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let QuickEventInput = class QuickEventInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], QuickEventInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], QuickEventInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], QuickEventInput.prototype, "capacity", void 0);
QuickEventInput = __decorate([
    type_graphql_1.InputType()
], QuickEventInput);
let QuickEventResolver = class QuickEventResolver {
    async createQuickEvent(input) {
        const event = await QuickEvent_1.QuickEvent.create(Object.assign({}, input)).save();
        return QuickEvent_1.QuickEvent.findOne(event.id);
    }
    quickEvent(id) {
        return QuickEvent_1.QuickEvent.findOne(id);
    }
    async updateQuickEvent(id, input) {
        const { raw } = await typeorm_1.getConnection()
            .createQueryBuilder()
            .update(QuickEvent_1.QuickEvent)
            .set(Object.assign({}, input))
            .where("id = :id", {
            id,
        })
            .returning("*")
            .execute();
        return raw[0];
    }
};
__decorate([
    type_graphql_1.Mutation(() => QuickEvent_1.QuickEvent),
    __param(0, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QuickEventInput]),
    __metadata("design:returntype", Promise)
], QuickEventResolver.prototype, "createQuickEvent", null);
__decorate([
    type_graphql_1.Query(() => QuickEvent_1.QuickEvent, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuickEventResolver.prototype, "quickEvent", null);
__decorate([
    type_graphql_1.Mutation(() => QuickEvent_1.QuickEvent, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, QuickEventInput]),
    __metadata("design:returntype", Promise)
], QuickEventResolver.prototype, "updateQuickEvent", null);
QuickEventResolver = __decorate([
    type_graphql_1.Resolver(QuickEvent_1.QuickEvent)
], QuickEventResolver);
exports.QuickEventResolver = QuickEventResolver;
//# sourceMappingURL=quick-event.js.map