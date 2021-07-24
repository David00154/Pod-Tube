import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { SharedEntity } from "../shared/SharedEntity";
import { User } from "./User";

@ObjectType({ description: "Channel Schema" })
@Entity()
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
  })
  @JoinColumn({ name: "user_id" })
  user: Promise<User>;
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
