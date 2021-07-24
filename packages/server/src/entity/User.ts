import { ArgsType, Ctx, Field, InputType, Int, ObjectType } from "type-graphql";
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { SharedEntity } from "../shared/SharedEntity";
import { Channel } from "./Channel";
import { v4 as uuid } from "uuid";
import { UserToFollower } from "./UserToFollower";
// import { UserFollower } from "./UserFollower";
// import { UserFollowers } from "./UserFollower";

@ObjectType({ description: "User Schema/Entity" })
@Entity()
export class User extends SharedEntity {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  _uid: string;

  @BeforeInsert()
  insertUserId() {
    this._uid = uuid();
  }

  @Field(() => Int || null, { defaultValue: null, nullable: true })
  @Column({ default: null })
  age: number;

  @Field()
  @Column()
  country: string;

  @Field(() => Channel, { nullable: true })
  @OneToOne(() => Channel, (channel) => channel.user, {
    // primary: true,
  })
  channel: Promise<Channel>;

  @Field(() => [UserToFollower], { nullable: true })
  @OneToMany(() => UserToFollower, (uf) => uf.followed)
  @JoinColumn()
  followersConnection: UserToFollower[];

  @Field(() => [UserToFollower], { nullable: true })
  // @OneToMany(() =>)
  async followers(
    @Ctx() { followersLoader }: any
  ): Promise<UserToFollower[] | null | undefined> {
    return followersLoader.load(this.id);
  }
}

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  name: string;

  @Field()
  country: string;

  @Field(() => Int || null, { defaultValue: null, nullable: true })
  age: number;
}

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  country?: string;

  @Field(() => Int || null, { defaultValue: null, nullable: true })
  age?: number;
}
