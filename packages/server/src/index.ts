import "reflect-metadata";
import { createConnection } from "typeorm";
// import {User} from "./entity/User";
import * as express from "express";
import { resolveModuleName } from "typescript";

const app = express();

app.get(
  "/",
  (req: express.Request, res: express.Response): express.Response => {
    return res.json({
      name: "David",
    });
  }
);

app.listen(process.env.PORT || 500, () =>
  console.log(`Server started on port ${process.env.PORT || 500}`)
);
// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));