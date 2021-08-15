import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Channel } from "../entity/Channel";
import { UpdateUserInput, User, UserInput } from "../entity/User";
import {
  AddFollowerInput,
  ChannelToFollower,
} from "../entity/ChannelToFollower";

// Resolver Based On CRUD Operations And Other Non Related CRUD Specifications
@Resolver(() => User)
export class UserResolver {
  // CREATE
  @Mutation((returns) => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    try {
      const newUser = await User.create({
        ...data,
      }).save();
      console.log(newUser);
      return newUser;
    } catch (e) {
      throw e;
    }
  }

  // READ
  @Query((returns) => [User], { nullable: true })
  async users(): Promise<User[] | null> {
    try {
      const users = await User.find({ relations: ["channel"] });
      console.log(users[0]);
      return users;
    } catch (e) {
      throw e;
    }
  }
  // UPDATE
  @Mutation(() => Boolean)
  async updateUser(
    @Arg("_uid", () => String) _uid: string,
    @Arg("input") input: UpdateUserInput
  ): Promise<boolean> {
    try {
      const updatedUser = await User.update({ _uid }, input);
      console.log(updatedUser);
      return updatedUser.affected == 0 ? false : true;
    } catch (e) {
      throw e;
    }
  }
  // DELETE

  // FIND
  @Query(() => User, { nullable: true })
  async getUser(@Arg("term") argv: string): Promise<User | null> {
    try {
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
    } catch (e) {
      throw e;
    }
  }

  @Mutation(() => ChannelToFollower)
  async addFollower(
    @Arg("input") { idOfFollowerChannel, idOfFollowedChannel }: AddFollowerInput
  ): Promise<ChannelToFollower | null> {
    try {
      const owendChannel = await Channel.findOne(
        { id: idOfFollowerChannel },
        { relations: ["user"] }
      );
      let followedChannel = await Channel.findOne(
        {
          id: idOfFollowedChannel,
        },
        { relations: ["user"] }
      );
      console.log(owendChannel);
      console.log(followedChannel);

      // const addedFollower = await ChannelToFollower.create({
      //   followed: follower,
      //   follower: user,
      // }).save();
      const addedFollower = await ChannelToFollower.create({
        owendChannel: owendChannel,
        owendChannelUserId: owendChannel.id,
        channel: followedChannel,
        channelUserId: followedChannel.id,
      }).save();

      return addedFollower;
    } catch (e) {
      throw e;
    }
  }
}
