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
const typeorm_1 = require("typeorm");
const EventTemplate_1 = require("../entities/EventTemplate");
let EventTemplateInput = class EventTemplateInput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], EventTemplateInput.prototype, "templateName", void 0);
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
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventTemplateInput.prototype, "clubBeemId", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventTemplateInput.prototype, "bsb", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventTemplateInput.prototype, "accountNumber", void 0);
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
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Date)
], EventTemplateInput.prototype, "date", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventTemplateInput.prototype, "startTime", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventTemplateInput.prototype, "endTime", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventTemplateInput.prototype, "youtubeLink", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventTemplateInput.prototype, "logoImageLink", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventTemplateInput.prototype, "bannerImageLink", void 0);
EventTemplateInput = __decorate([
    type_graphql_1.InputType()
], EventTemplateInput);
let EventTemplateResolver = class EventTemplateResolver {
    eventTemplates({ req }) {
        return EventTemplate_1.EventTemplate.find({ where: { ownerId: req.session.userId } });
    }
    eventTemplate(id) {
        return EventTemplate_1.EventTemplate.findOne({ id });
    }
    async createEventTemplate(input, { req }) {
        const eventTemplate = await EventTemplate_1.EventTemplate.create(Object.assign(Object.assign({}, input), { ownerId: req.session.userId })).save();
        return eventTemplate;
    }
    async deleteEventTemplate(templateId) {
        const eventTemplate = await EventTemplate_1.EventTemplate.findOne(templateId);
        if (!eventTemplate) {
            return false;
        }
        await EventTemplate_1.EventTemplate.delete(templateId);
        return true;
    }
    async updateEventTemplate(id, input) {
        const { raw } = await typeorm_1.getConnection()
            .createQueryBuilder()
            .update(EventTemplate_1.EventTemplate)
            .set(Object.assign({}, input))
            .where("id = :id", { id })
            .returning("*")
            .execute();
        return raw[0];
    }
};
__decorate([
    type_graphql_1.Query(() => [EventTemplate_1.EventTemplate]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventTemplateResolver.prototype, "eventTemplates", null);
__decorate([
    type_graphql_1.Query(() => EventTemplate_1.EventTemplate),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventTemplateResolver.prototype, "eventTemplate", null);
__decorate([
    type_graphql_1.Mutation(() => EventTemplate_1.EventTemplate),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EventTemplateInput, Object]),
    __metadata("design:returntype", Promise)
], EventTemplateResolver.prototype, "createEventTemplate", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("templateId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventTemplateResolver.prototype, "deleteEventTemplate", null);
__decorate([
    type_graphql_1.Mutation(() => EventTemplate_1.EventTemplate, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, EventTemplateInput]),
    __metadata("design:returntype", Promise)
], EventTemplateResolver.prototype, "updateEventTemplate", null);
EventTemplateResolver = __decorate([
    type_graphql_1.Resolver(EventTemplate_1.EventTemplate)
], EventTemplateResolver);
exports.EventTemplateResolver = EventTemplateResolver;
//# sourceMappingURL=event-template.js.map