import DataLoader = require("dataloader");
import { In } from "typeorm";
import { ChannelToFollower } from "../entity/ChannelToFollower";
const batchLoader = async (channelIds: number[]) => {
  const userFollowers = await ChannelToFollower.find({
    join: {
      alias: "userFollower",
      innerJoinAndSelect: {
        followedChannel: "userFollower.followedChannel",
      },
    },
    where: {
      owendChannelId: In(channelIds),
    },
    // relations: ["channel"],
  });
  console.log(userFollowers);
  const userIdToFollowers: { [key: number]: ChannelToFollower[] } = {};

  userFollowers.forEach(async (uf: any) => {
    // console.log(uf);
    if (uf.owendChannelId in userIdToFollowers) {
      userIdToFollowers[uf.owendChannelId].push(uf);
    } else {
      userIdToFollowers[uf.owendChannelId] = [uf];
    }
  });
  return channelIds.map((userId) => userIdToFollowers[userId]);
};

export const creeateFollowersLoader = () => new DataLoader(batchLoader);
