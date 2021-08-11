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
exports.ClubSport = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Club_1 = require("./Club");
const Sport_1 = require("./Sport");
let ClubSport = class ClubSport extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], ClubSport.prototype, "clubId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Club_1.Club, (club) => club.events),
    __metadata("design:type", Club_1.Club)
], ClubSport.prototype, "club", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], ClubSport.prototype, "sportId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Sport_1.Sport, (s) => s.clubs, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Sport_1.Sport)
], ClubSport.prototype, "sport", void 0);
ClubSport = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], ClubSport);
exports.ClubSport = ClubSport;
//# sourceMappingURL=ClubSport.js.map