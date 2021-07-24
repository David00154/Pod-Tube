import "reflect-metadata";
import { createConnection } from "typeorm";

import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
// import { buildSchema } from "type-graphql";
// import { UserResolver } from "./resolver/UserResolver";
// import { ChannelResolver } from "./resolver/ChannelResolver";
import { createSchema } from "./createSchema";
import { creeateFollowersLoader } from "./shared/followersLoader";

const PORT = process.env.PORT || 500;

const app = express();

(async () => {
  try {
    await createConnection();
    console.log("DataBase connected");
    const server = new ApolloServer({
      schema: await createSchema(),
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
      context: ({ req, res }) => ({
        req,
        res,
        followersLoader: creeateFollowersLoader(),
      }),
    });
    await server.start();
    server.applyMiddleware({ app });
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
})();
