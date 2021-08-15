import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Channel, ChannelInput, ChannelUpdateInput } from "../entity/Channel";

@Resolver(() => Channel)
export class ChannelResolver {
  // CREATE
  @Mutation((returns) => Channel)
  async createChannel(@Arg("data") data: ChannelInput): Promise<Channel> {
    try {
      const newChannel = await Channel.create(data).save();
      return newChannel;
    } catch (e) {
      throw e;
    }
  }

  // READ
  @Query(() => [Channel])
  async channels(): Promise<Channel[]> {
    try {
      const channels = await Channel.find({ relations: ["followers"] });
      //
      // console.log(channels[0].followers);
      return channels;
    } catch (e) {
      throw e;
    }
  }

  // UPDATE
  @Mutation(() => Boolean)
  async updateChannel(
    @Arg("_uid", () => Int) user_id: number,
    @Arg("input") input: ChannelUpdateInput
  ): Promise<boolean> {
    try {
      const updatedChannel = await Channel.update({ user_id }, input);
      console.log(updatedChannel);
      return updatedChannel.affected == 0 ? false : true;
    } catch (e) {
      throw e;
    }
  }

  // DELETE

  // FIND
  @Query(() => Channel, { nullable: true })
  async getChannel(@Arg("term") argv: string): Promise<Channel | null> {
    try {
      // const users = await Channel.findOne(args);
      let channel: Channel;
      console.log(argv);
      const arg = argv.split(":");
      // if (arg.length > 1 && arg[0] == "channel") {
      //   channel = await Channel.findOne({ channel_name: arg[1] });
      // } else
      if (arg.length > 1 && arg[0] == "_uid") {
        channel = await Channel.findOne({ user_id: parseInt(arg[1]) });
      } else if (arg.length > 1 && arg[0] == "id") {
        channel = await Channel.findOne({ id: parseInt(arg[1]) });
      }
      // else if (arg.length > 1 && arg[0] == "node_id") {
      //   channel = await Channel.findOne({ node_id: arg[1] });
      // }
      else {
        channel = await Channel.findOne({ channel_name: arg[0] });
      }
      return channel;
    } catch (e) {
      throw e;
    }
  }
}
