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
import { User } from "./User";

@ObjectType()
@Entity({ name: "followers" })
export class UserToFollower extends SharedEntity {
  @Field(() => Int)
  @PrimaryColumn()
  followerId: number;

  @Field(() => Int)
  @PrimaryColumn()
  followedId: number;

  // Connect One follower to a user
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.followersConnection)
  // @JoinColumn({ name: "followerToUserId" })
  follower: User;

  // Connects many users to one userFollower
  @Field(() => User)
  @ManyToOne(() => User)
  // @JoinColumn({ name: "userFollowerId" })
  followed: User;
}

@InputType()
export class AddFollowerInput {
  @Field(() => Int)
  followerId: number;

  @Field(() => Int)
  userId: number;
}
