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
exports.ClubEvent = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Club_1 = require("./Club");
const Event_1 = require("./Event");
let ClubEvent = class ClubEvent extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], ClubEvent.prototype, "clubId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Club_1.Club, (club) => club.events),
    __metadata("design:type", Club_1.Club)
], ClubEvent.prototype, "club", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], ClubEvent.prototype, "eventId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Event_1.Event, (e) => e.clubs, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Event_1.Event)
], ClubEvent.prototype, "event", void 0);
ClubEvent = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], ClubEvent);
exports.ClubEvent = ClubEvent;
//# sourceMappingURL=ClubEvent.js.map