import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Button, Skeleton } from "@chakra-ui/react";
import React from "react";
import {
  MeQuery,
  useFollowClubMutation,
  useMeQuery,
  User,
} from "../generated/graphql";

interface Props {
  followerList: Array<User>;
  clubId: number;
  data: MeQuery;
  addFollower: () => void;
}

const FollowClub: React.FC<Props> = ({
  followerList,
  clubId,
  data,
  addFollower,
}) => {
  const [isFollowing, setIsFollowing] = React.useState(
    followerList.map((user) => user.id).includes(data.me?.id)
  );
  const [, followClub] = useFollowClubMutation();
  // const [{ data, fetching }] = useMeQuery();

  const handleFollow = async (): Promise<void> => {
    if (!isFollowing) {
      const { error } = await followClub({
        followerId: data.me?.id,
        clubId: clubId,
      });
      if (!error) {
        addFollower();
      }
    } else {
      // unfollow
    }
    setIsFollowing(!isFollowing);
  };

  if (!data) {
    return (
      <Button isLoading={true} colorScheme='teal'>
        Follow
      </Button>
    );
  }
  return (
    <Button
      leftIcon={isFollowing ? <MinusIcon /> : <AddIcon />}
      colorScheme='teal'
      variant='solid'
      onClick={handleFollow}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export { FollowClub };
