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
exports.Attendee = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const EventAttendee_1 = require("./EventAttendee");
let Attendee = class Attendee extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Attendee.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Attendee.prototype, "firstname", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Attendee.prototype, "lastname", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Attendee.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(() => Number),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", Number)
], Attendee.prototype, "phoneNumber", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Attendee.prototype, "beemId", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Attendee.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Attendee.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => EventAttendee_1.EventAttendee, (ca) => ca.attendee),
    __metadata("design:type", Array)
], Attendee.prototype, "eventConnection", void 0);
Attendee = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Attendee);
exports.Attendee = Attendee;
//# sourceMappingURL=Attendee.js.map