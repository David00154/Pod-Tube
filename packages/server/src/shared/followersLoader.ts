import DataLoader = require("dataloader");
import { In } from "typeorm";
import { UserToFollower } from "../entity/UserToFollower";
const batchLoader = async (userIds: number[]) => {
  const userFollowers = await UserToFollower.find({
    join: {
      alias: "userFollower",
      innerJoinAndSelect: {
        followed: "userFollower.followed",
      },
    },
    where: {
      followerId: In(userIds),
    },
    relations: ["followed"],
  });

  const userIdToFollowers: { [key: number]: UserToFollower[] } = {};

  userFollowers.forEach(async (uf: any) => {
    // console.log(uf);
    if (uf.followerId in userIdToFollowers) {
      userIdToFollowers[uf.followerId].push(uf);
    } else {
      userIdToFollowers[uf.followerId] = [uf];
    }
  });
  return userIds.map((userId) => userIdToFollowers[userId]);
};

export const creeateFollowersLoader = () => new DataLoader(batchLoader);
