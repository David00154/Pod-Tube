import { buildSchema } from "type-graphql";
import { ChannelResolver } from "./resolver/ChannelResolver";
import { UserResolver } from "./resolver/UserResolver";

export async function createSchema() {
  return await buildSchema({
    resolvers: [UserResolver, ChannelResolver],
  });
}
