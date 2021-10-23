import { Field, InputType } from "type-graphql";

@InputType()
export class UsernamePasswordInput {
  @Field(() => String)
  firstname: string;
  @Field(() => String)
  lastname: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  clubName: string;
  @Field(() => String)
  password: string;
}

@InputType()
export class UserRegisterInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  clubName: string;
  @Field(() => String)
  password: string;
}
