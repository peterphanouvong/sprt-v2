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
exports.ClubFollower = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Club_1 = require("./Club");
const User_1 = require("./User");
let ClubFollower = class ClubFollower extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], ClubFollower.prototype, "clubId", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], ClubFollower.prototype, "followerId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Club_1.Club, (club) => club.followers, { onDelete: "CASCADE" }),
    __metadata("design:type", Club_1.Club)
], ClubFollower.prototype, "club", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (u) => u.clubFollowerConnection, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", User_1.User)
], ClubFollower.prototype, "follower", void 0);
ClubFollower = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], ClubFollower);
exports.ClubFollower = ClubFollower;
//# sourceMappingURL=ClubFollower.js.map