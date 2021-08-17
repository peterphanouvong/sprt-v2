import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import {
  MeQuery,
  useFollowClubMutation,
  User,
  useUnfollowClubMutation,
} from "../generated/graphql";

interface Props {
  followerList: Array<User>;
  clubId: number;
  data: MeQuery;
  addFollower: () => void;
  removeFollower: () => void;
}

const ClubFollowButton: React.FC<Props> = ({
  followerList,
  clubId,
  data,
  addFollower,
  removeFollower,
}) => {
  const [isFollowing, setIsFollowing] = React.useState(
    followerList.map((user) => user.id).includes(data.me?.id)
  );
  const [, followClub] = useFollowClubMutation();
  const [, unfollowClub] = useUnfollowClubMutation();
  const toast = useToast();

  const handleButton = async (): Promise<void> => {
    if (!isFollowing) {
      handleFollow();
    } else {
      handleUnfollow();
    }
    setIsFollowing(!isFollowing);
  };

  const handleFollow = async (): Promise<void> => {
    const { error } = await followClub({
      followerId: data.me?.id,
      clubId: clubId,
    });
    if (!error) {
      addFollower();
    } else {
      console.log(error);
      toast({
        title: "Error",
        variant: "subtle",
        position: "top",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUnfollow = async (): Promise<void> => {
    const { error } = await unfollowClub({
      followerId: data.me?.id,
      clubId: clubId,
    });
    if (!error) {
      removeFollower();
    }
  };

  if (!data) {
    return (
      <Button isLoading={true} colorScheme='orange'>
        Follow
      </Button>
    );
  }
  return (
    <Button
      leftIcon={isFollowing ? <MinusIcon /> : <AddIcon />}
      colorScheme='orange'
      variant='solid'
      onClick={handleButton}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export { ClubFollowButton };
