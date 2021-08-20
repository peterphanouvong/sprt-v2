import { PublicityType } from "../entities/PublicityType";
import { Query, Resolver } from "type-graphql";

@Resolver(PublicityType)
export class PublicityTypeResolver {
  @Query(() => [PublicityType])
  publicityTypes(): Promise<PublicityType[]> {
    return PublicityType.find();
  }
}
