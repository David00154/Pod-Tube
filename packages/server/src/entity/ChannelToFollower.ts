import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { SharedEntity } from "../shared/SharedEntity";
import { Channel } from "./Channel";
// import { User } from "./User";

@ObjectType()
@Entity({ name: "followers" })
export class ChannelToFollower extends SharedEntity {
  @Field(() => Int)
  @PrimaryColumn()
  owendChannelUserId: number;

  @Field(() => Int)
  @PrimaryColumn()
  channelId: number;

  @Field(() => Int)
  @PrimaryColumn()
  channelUserId: number;

  @Field(() => Int)
  @PrimaryColumn()
  owendChannelId: number;

  // @Field(() => Channel)
  @ManyToOne(() => Channel, (channel) => channel.followers, {
    // onDelete: "CASCADE",
    // primary: true,
  })
  @JoinColumn()
  owendChannel: Channel;

  // Connects many channel to one userFollower
  @Field(() => Channel, { nullable: true })
  @ManyToOne(() => Channel)
  @JoinColumn()
  async channel(): Promise<Channel> {
    const channel = await Channel.findOne({ id: this.channelId });
    return channel;
  }
  // channel: Promise<Channel>;
}

@InputType()
export class AddFollowerInput {
  @Field(() => Int)
  idOfFollowerChannel: number;

  @Field(() => Int)
  idOfFollowedChannel: number;
}
