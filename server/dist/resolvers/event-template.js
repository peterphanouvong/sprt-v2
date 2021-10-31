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
exports.EventTemplateResolver = void 0;
const type_graphql_1 = require("type-graphql");
const EventTemplate_1 = require("../entities/EventTemplate");
let EventTemplateInput = class EventTemplateInput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], EventTemplateInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventTemplateInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], EventTemplateInput.prototype, "capacity", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], EventTemplateInput.prototype, "clubBeemId", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventTemplateInput.prototype, "venue", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventTemplateInput.prototype, "address", void 0);
__decorate([
    type_graphql_1.Field(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], EventTemplateInput.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], EventTemplateInput.prototype, "templateName", void 0);
EventTemplateInput = __decorate([
    type_graphql_1.InputType()
], EventTemplateInput);
let EventTemplateResolver = class EventTemplateResolver {
    eventTemplates() {
        return EventTemplate_1.EventTemplate.find();
    }
    async createEventTemplate(input) {
        const eventTemplate = await EventTemplate_1.EventTemplate.create(input).save();
        console.log(eventTemplate);
        return eventTemplate;
    }
};
__decorate([
    type_graphql_1.Query(() => [EventTemplate_1.EventTemplate]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventTemplateResolver.prototype, "eventTemplates", null);
__decorate([
    type_graphql_1.Mutation(() => EventTemplate_1.EventTemplate),
    __param(0, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EventTemplateInput]),
    __metadata("design:returntype", Promise)
], EventTemplateResolver.prototype, "createEventTemplate", null);
EventTemplateResolver = __decorate([
    type_graphql_1.Resolver(EventTemplate_1.EventTemplate)
], EventTemplateResolver);
exports.EventTemplateResolver = EventTemplateResolver;
//# sourceMappingURL=event-template.js.map