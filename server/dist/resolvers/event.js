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
exports.EventResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Event_1 = require("../entities/Event");
let EventInput = class EventInput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], EventInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventInput.prototype, "date", void 0);
__decorate([
    type_graphql_1.Field(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], EventInput.prototype, "capacity", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], EventInput.prototype, "clubBeemId", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventInput.prototype, "venue", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventInput.prototype, "address", void 0);
__decorate([
    type_graphql_1.Field(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], EventInput.prototype, "price", void 0);
EventInput = __decorate([
    type_graphql_1.InputType()
], EventInput);
let EventResolver = class EventResolver {
    event(id) {
        return Event_1.Event.findOne(id);
    }
    events() {
        return Event_1.Event.find();
    }
    async createEvent(input) {
        const event = await Event_1.Event.create(input).save();
        console.log(event);
        return event;
    }
};
__decorate([
    type_graphql_1.Query(() => Event_1.Event),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "event", null);
__decorate([
    type_graphql_1.Query(() => [Event_1.Event]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "events", null);
__decorate([
    type_graphql_1.Mutation(() => Event_1.Event),
    __param(0, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EventInput]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "createEvent", null);
EventResolver = __decorate([
    type_graphql_1.Resolver(Event_1.Event)
], EventResolver);
exports.EventResolver = EventResolver;
//# sourceMappingURL=event.js.map