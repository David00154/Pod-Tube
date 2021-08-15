import { Ctx, Field, InputType, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { SharedEntity } from "../shared/SharedEntity";
import { User } from "./User";
import { ChannelToFollower } from "./ChannelToFollower";

@ObjectType({ description: "Channel Schema" })
@Entity({ name: "channels" })
export class Channel extends SharedEntity {
  @Field()
  @Column()
  channel_name?: string | null;

  @Field(() => Int)
  @PrimaryColumn()
  user_id: number;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.channel, {
    primary: true,
    // cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: Promise<User>;

  @Field(() => [ChannelToFollower], { nullable: true })
  @OneToMany(() => ChannelToFollower, (uf) => uf.owendChannel, {
    onDelete: "CASCADE",
    primary: true,
    // cascade: true,
  })
  // @JoinColumn()
  followers: Promise<ChannelToFollower[]>;

  // @Field(() => [ChannelToFollower], { nullable: true })
  // // @OneToMany(() =>)
  // async followers(
  //   @Ctx() { followersLoader }: any
  // ): Promise<ChannelToFollower[] | null | undefined> {
  //   // console.log(this.id);
  //   return followersLoader.load(this.id);
  // }
}

@InputType()
export class ChannelInput implements Partial<Channel> {
  @Field()
  channel_name: string;

  @Field(() => Int)
  user_id: number;
}

@InputType()
export class ChannelUpdateInput implements Partial<Channel> {
  @Field()
  channel_name: string;
}
