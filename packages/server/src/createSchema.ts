import { buildSchema } from "type-graphql";
import { UserResolver, ChannelResolver } from "./resolver";

export async function createSchema() {
  return await buildSchema({
    resolvers: [UserResolver, ChannelResolver],
  });
}
