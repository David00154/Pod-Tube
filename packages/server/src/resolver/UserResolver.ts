import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UpdateUserInput, User, UserInput } from "../entity/User";
import { AddFollowerInput, UserToFollower } from "../entity/UserToFollower";

// Resolver Based On CRUD Operations And Other Non Related CRUD Specifications
@Resolver(() => User)
export class UserResolver {
  // CREATE
  @Mutation((returns) => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    const newUser = await User.create({
      ...data,
    }).save();
    console.log(newUser);
    return newUser;
  }

  // READ
  @Query((returns) => [User], { nullable: true })
  async users(): Promise<User[] | null> {
    const users = await User.find({});
    return users;
  }
  // UPDATE
  @Mutation(() => Boolean)
  async updateUser(
    @Arg("_uid", () => String) _uid: string,
    @Arg("input") input: UpdateUserInput
  ): Promise<boolean> {
    const updatedUser = await User.update({ _uid }, input);
    console.log(updatedUser);
    return updatedUser.affected == 0 ? false : true;
  }
  // DELETE

  // FIND
  @Query(() => User, { nullable: true })
  async getUser(@Arg("term") argv: string): Promise<User | null> {
    // const users = await User.findOne(args);
    let user: User;
    console.log(argv);
    const arg = argv.split(":");
    // if (arg.length > 1 && arg[0] == "channel") {
    //   user = await User.findOne({ channel_name: arg[1] });
    // } else
    if (arg.length > 1 && arg[0] == "_uid") {
      user = await User.findOne({ _uid: arg[1] });
    } else if (arg.length > 1 && arg[0] == "id") {
      user = await User.findOne({ id: parseInt(arg[1]) });
    } else if (arg.length > 1 && arg[0] == "node_id") {
      user = await User.findOne({ node_id: arg[1] });
    } else {
      user = await User.findOne({ name: arg[0] });
    }
    return user;
  }

  @Mutation(() => UserToFollower)
  async addFollower(
    @Arg("input") { followerId, userId }: AddFollowerInput
  ): Promise<UserToFollower | null> {
    try {
      const follower = await User.findOne({ id: followerId });
      const user = await User.findOne({ id: userId });

      const addedFollower = await UserToFollower.create({
        followed: follower,
        follower: user,
      }).save();

      return addedFollower;
    } catch (e) {
      throw e;
    }
  }
}
