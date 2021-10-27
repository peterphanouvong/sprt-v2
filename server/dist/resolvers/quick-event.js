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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickEventResolver = void 0;
const posix_1 = __importDefault(require("path/posix"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const QuickEvent_1 = require("../entities/QuickEvent");
const graphql_upload_1 = require("graphql-upload");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
    keyFileName: posix_1.default.join(__dirname, "../../sprt-5111-a70dbe0842eb.json"),
    projectId: "sprt-quick-event",
});
let QuickEventInput = class QuickEventInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
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
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], QuickEventInput.prototype, "users", void 0);
__decorate([
    type_graphql_1.Field(() => graphql_upload_1.GraphQLUpload, { nullable: true }),
    __metadata("design:type", Object)
], QuickEventInput.prototype, "bannerImage", void 0);
__decorate([
    type_graphql_1.Field(() => graphql_upload_1.GraphQLUpload, { nullable: true }),
    __metadata("design:type", Object)
], QuickEventInput.prototype, "logoImage", void 0);
QuickEventInput = __decorate([
    type_graphql_1.InputType()
], QuickEventInput);
let QuickEventUserInput = class QuickEventUserInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], QuickEventUserInput.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], QuickEventUserInput.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], QuickEventUserInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], QuickEventUserInput.prototype, "beemId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], QuickEventUserInput.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], QuickEventUserInput.prototype, "createdAt", void 0);
QuickEventUserInput = __decorate([
    type_graphql_1.InputType()
], QuickEventUserInput);
let QuickEventResolver = class QuickEventResolver {
    async newQuickEvent(quickEvent, id) {
        if (quickEvent === undefined) {
            return QuickEvent_1.QuickEvent.findOne(id);
        }
        return quickEvent;
    }
    async uploadLogoImage(object, eventId) {
        console.log("testing filename: ", object);
        const { createReadStream } = await object;
        const newFilename = `logo/qe-${eventId}-logo.jpg`;
        await new Promise((res) => createReadStream()
            .pipe(storage
            .bucket("qe_banner_images")
            .file(newFilename)
            .createWriteStream({
            resumable: false,
            gzip: true,
        }))
            .on("finish", res));
        return true;
    }
    async uploadBannerImage(object, eventId) {
        console.log("testing filename: ", object);
        const { createReadStream } = await object;
        const newFilename = `banner/qe-${eventId}-banner.jpg`;
        await new Promise((res) => createReadStream()
            .pipe(storage
            .bucket("qe_banner_images")
            .file(newFilename)
            .createWriteStream({
            resumable: false,
            gzip: true,
        }))
            .on("finish", res));
        return true;
    }
    async createQuickEvent(input, pubSub) {
        console.log(input);
        const event = await QuickEvent_1.QuickEvent.create(Object.assign({}, input)).save();
        await pubSub.publish(`QUICK-EVENT-${event.id}`, event);
        if (input.logoImage) {
            await this.uploadLogoImage(input.logoImage, event.id);
        }
        if (input.bannerImage) {
            await this.uploadBannerImage(input.bannerImage, event.id);
        }
        return QuickEvent_1.QuickEvent.findOne(event.id);
    }
    quickEvent(id) {
        return QuickEvent_1.QuickEvent.findOne(id);
    }
    async updateQuickEvent(id, input, pubSub) {
        const { raw } = await typeorm_1.getConnection()
            .createQueryBuilder()
            .update(QuickEvent_1.QuickEvent)
            .set(Object.assign({}, input))
            .where("id = :id", {
            id,
        })
            .returning("*")
            .execute();
        await pubSub.publish(`QUICK-EVENT-${id}`, raw[0]);
        return raw[0];
    }
    async joinQuickEvent(input, id, pubSub) {
        const event = await QuickEvent_1.QuickEvent.findOne(id);
        let userString = "";
        if (event === null || event === void 0 ? void 0 : event.users) {
            let users = JSON.parse(event.users);
            users.forEach((user) => {
                if (user.email === input.email) {
                    throw Error("An attendee with that phone number already exists");
                }
            });
            users.push(input);
            userString = JSON.stringify(users);
        }
        const { raw } = await typeorm_1.getConnection()
            .createQueryBuilder()
            .update(QuickEvent_1.QuickEvent)
            .set({ users: userString })
            .where("id = :id", {
            id,
        })
            .returning("*")
            .execute();
        await pubSub.publish(`QUICK-EVENT-${id}`, raw[0]);
        return raw[0];
    }
};
__decorate([
    type_graphql_1.Subscription(() => QuickEvent_1.QuickEvent, {
        topics: ({ args }) => `QUICK-EVENT-${args.id}`,
    }),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], QuickEventResolver.prototype, "newQuickEvent", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("file", () => graphql_upload_1.GraphQLUpload)),
    __param(1, type_graphql_1.Arg("eventId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], QuickEventResolver.prototype, "uploadLogoImage", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("file", () => graphql_upload_1.GraphQLUpload)),
    __param(1, type_graphql_1.Arg("eventId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], QuickEventResolver.prototype, "uploadBannerImage", null);
__decorate([
    type_graphql_1.Mutation(() => QuickEvent_1.QuickEvent),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.PubSub()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QuickEventInput,
        type_graphql_1.PubSubEngine]),
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
    __param(2, type_graphql_1.PubSub()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, QuickEventInput,
        type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], QuickEventResolver.prototype, "updateQuickEvent", null);
__decorate([
    type_graphql_1.Mutation(() => QuickEvent_1.QuickEvent),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Arg("id")),
    __param(2, type_graphql_1.PubSub()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QuickEventUserInput, Number, type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], QuickEventResolver.prototype, "joinQuickEvent", null);
QuickEventResolver = __decorate([
    type_graphql_1.Resolver(QuickEvent_1.QuickEvent)
], QuickEventResolver);
exports.QuickEventResolver = QuickEventResolver;
//# sourceMappingURL=quick-event.js.map