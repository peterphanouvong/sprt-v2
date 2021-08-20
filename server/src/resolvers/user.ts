import { User } from "../entities/User";
import { MyContext } from "src/types";
import bcrypt from "bcrypt";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import { sendEmail } from "../utils/sendEmail";
import { v4 as uuid } from "uuid";
import { getConnection } from "typeorm";
import { Club } from "../entities/Club";
import { Event } from "../entities/Event";
import { isAuth } from "../middleware/isAuth";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  /**
   * Field Resolvers
   */

  @FieldResolver(() => [Club])
  async adminClubs(@Root() user: User, @Ctx() { clubLoader }: MyContext) {
    const clubIds = await getConnection().query(`
       select array_agg("clubId")
       from "club_admin"
       where "adminId" = ${user.id};
     `);
    return clubLoader.loadMany(clubIds[0].array_agg ?? []);
  }

  @FieldResolver(() => [Club])
  async followingClubs(@Root() user: User, @Ctx() { clubLoader }: MyContext) {
    const clubIds = await getConnection().query(`
      select array_agg("clubId")
      from "club_follower"
      where "followerId" = ${user.id};
    `);
    return clubLoader.loadMany(clubIds[0].array_agg ?? []);
  }

  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext): string {
    if (req.session.userId === user.id) {
      return user.email;
    } else {
      return "";
    }
  }

  /**
   * CRUD
   */

  @Mutation(() => UserResponse)
  async register(
    @Arg("options", () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ) {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }
    const hashedPassword = await bcrypt.hash(options.password, 10);
    let user;
    try {
      const res = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          email: options.email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();

      user = res.raw[0];
    } catch (err) {
      // if (err.code === "23505" || err.details.includes("already exists")) {
      // duplicate username
      return {
        errors: [
          {
            field: "username",
            message: "that username has been taken",
          },
        ],
      };
      // }
    }

    // log in the user
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({
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
    const valid = await bcrypt.compare(password, user.password);
    console.log(valid);
    if (!valid) {
      return {
        errors: [{ field: "password", message: "incorrect password" }],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }

  /**
   * Other
   */
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
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

    const id = await redis.get(FORGET_PASSWORD_PREFIX + token);

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
    const user = await User.findOne(userId);
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

    User.update(
      { id: userId },
      { password: await bcrypt.hash(newPassword, 10) }
    );

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // email is not in the db
      return true;
    }

    const token = uuid();

    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    );

    sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
    );
    return true;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    // req.session.reload((err) => console.log(err));
    console.log(req.session);
    console.log(req.sessionID);
    if (!req.session.userId) {
      return null;
    }
    return User.findOne(req.session.userId);
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id") id: number): Promise<User | undefined> {
    return await User.findOne(id);
  }

  @Query(() => User, { nullable: true })
  async userByUsername(
    @Arg("username") username: string
  ): Promise<User | undefined> {
    return await User.findOne({ username });
  }

  @Query(() => [Event])
  @UseMiddleware(isAuth)
  async myFeed(@Ctx() { req, eventLoader }: MyContext) {
    const eventIds = await getConnection().query(`
    select array_agg(e.id)
    from "event" e
    inner join "club_follower" cf on cf."clubId" = e."clubId"
    where cf."followerId" = ${req.session.userId};
  `);

    return eventLoader.loadMany(eventIds[0].array_agg ?? []);

    // aim: show me events posted by the clubs that i follow
  }
}
