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
exports.UserResolver = void 0;
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const type_graphql_1 = require("type-graphql");
const constants_1 = require("../constants");
const UsernamePasswordInput_1 = require("./UsernamePasswordInput");
const validateRegister_1 = require("../utils/validateRegister");
const sendEmail_1 = require("../utils/sendEmail");
const uuid_1 = require("uuid");
const typeorm_1 = require("typeorm");
const Club_1 = require("../entities/Club");
const Event_1 = require("../entities/Event");
const isAuth_1 = require("../middleware/isAuth");
let FieldError = class FieldError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    type_graphql_1.ObjectType()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
let UserResolver = class UserResolver {
    async events(user, { eventLoader }) {
        var _a;
        const clubIds = await typeorm_1.getConnection().query(`
        select array_agg("id")
        from "event"
        where "hostId" = ${user.id};
      `);
        return eventLoader.loadMany((_a = clubIds[0].array_agg) !== null && _a !== void 0 ? _a : []);
    }
    async adminClubs(user, { clubLoader }) {
        var _a;
        const clubIds = await typeorm_1.getConnection().query(`
       select array_agg("clubId")
       from "club_admin"
       where "adminId" = ${user.id};
     `);
        return clubLoader.loadMany((_a = clubIds[0].array_agg) !== null && _a !== void 0 ? _a : []);
    }
    async followingClubs(user, { clubLoader }) {
        var _a;
        const clubIds = await typeorm_1.getConnection().query(`
      select array_agg("clubId")
      from "club_follower"
      where "followerId" = ${user.id};
    `);
        return clubLoader.loadMany((_a = clubIds[0].array_agg) !== null && _a !== void 0 ? _a : []);
    }
    email(user, { req }) {
        if (req.session.userId === user.id) {
            return user.email;
        }
        else {
            return "";
        }
    }
    async register(options, { req }) {
        const errors = validateRegister_1.validateRegister(options);
        if (errors) {
            return { errors };
        }
        const hashedPassword = await bcrypt_1.default.hash(options.password, 10);
        let user;
        try {
            const res = await typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(User_1.User)
                .values({
                firstname: options.firstname,
                lastname: options.lastname,
                username: options.username,
                email: options.email,
                password: hashedPassword,
            })
                .returning("*")
                .execute();
            user = res.raw[0];
        }
        catch (err) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "that username has been taken",
                    },
                ],
            };
        }
        req.session.userId = user.id;
        return { user };
    }
    async login(usernameOrEmail, password, { req }) {
        const user = await User_1.User.findOne({
            where: usernameOrEmail.includes("@")
                ? { email: usernameOrEmail }
                : { username: usernameOrEmail },
        });
        if (!user) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "that username or email doesn't exist",
                    },
                ],
            };
        }
        const valid = await bcrypt_1.default.compare(password, user.password);
        console.log(valid);
        if (!valid) {
            return {
                errors: [{ field: "password", message: "incorrect password" }],
            };
        }
        req.session.userId = user.id;
        return { user };
    }
    logout({ req, res }) {
        return new Promise((resolve) => req.session.destroy((err) => {
            res.clearCookie(constants_1.COOKIE_NAME);
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            resolve(true);
        }));
    }
    async changePassword(token, newPassword, { redis, req }) {
        if (newPassword.length <= 2) {
            return {
                errors: [
                    {
                        field: "newPassword",
                        message: "length must be greater than 2",
                    },
                ],
            };
        }
        const id = await redis.get(constants_1.FORGET_PASSWORD_PREFIX + token);
        if (!id) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "token expired",
                    },
                ],
            };
        }
        const userId = parseInt(id);
        const user = await User_1.User.findOne(userId);
        if (!user) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "token expired",
                    },
                ],
            };
        }
        User_1.User.update({ id: userId }, { password: await bcrypt_1.default.hash(newPassword, 10) });
        req.session.userId = user.id;
        return { user };
    }
    async forgotPassword(email, { redis }) {
        const user = await User_1.User.findOne({ where: { email } });
        if (!user) {
            return true;
        }
        const token = uuid_1.v4();
        await redis.set(constants_1.FORGET_PASSWORD_PREFIX + token, user.id, "ex", 1000 * 60 * 60 * 24 * 3);
        sendEmail_1.sendEmail(email, `<a href="http://localhost:3000/change-password/${token}">reset password</a>`);
        return true;
    }
    me({ req }) {
        console.log(req.session);
        console.log(req.sessionID);
        if (!req.session.userId) {
            return null;
        }
        return User_1.User.findOne(req.session.userId);
    }
    async user(id) {
        return await User_1.User.findOne(id);
    }
    async userByUsername(username) {
        return await User_1.User.findOne({ username });
    }
    async myFeed({ req, eventLoader }) {
        var _a;
        const eventIds = await typeorm_1.getConnection().query(`
    select array_agg(e.id)
    from "event" e
    inner join "club_follower" cf on cf."clubId" = e."clubId"
    where cf."followerId" = ${req.session.userId};
  `);
        return eventLoader.loadMany((_a = eventIds[0].array_agg) !== null && _a !== void 0 ? _a : []);
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => [Event_1.Event]),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "events", null);
__decorate([
    type_graphql_1.FieldResolver(() => [Club_1.Club]),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "adminClubs", null);
__decorate([
    type_graphql_1.FieldResolver(() => [Club_1.Club]),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "followingClubs", null);
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, Object]),
    __metadata("design:returntype", String)
], UserResolver.prototype, "email", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("options", () => UsernamePasswordInput_1.UsernamePasswordInput)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsernamePasswordInput_1.UsernamePasswordInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("usernameOrEmail")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("token")),
    __param(1, type_graphql_1.Arg("newPassword")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userByUsername", null);
__decorate([
    type_graphql_1.Query(() => [Event_1.Event]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "myFeed", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map