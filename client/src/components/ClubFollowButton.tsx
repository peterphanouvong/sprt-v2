import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Button, ButtonProps, useToast } from "@chakra-ui/react";
import React from "react";
import {
  MeQuery,
  useFollowClubMutation,
  User,
  useUnfollowClubMutation,
} from "../generated/graphql";
import { handleNotLoggedin } from "../utils/handleNotLoggedIn";
import { useIsLoggedIn } from "../utils/useIsLoggedIn";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";

// Passing chakra props into custom component
type Props = ButtonProps & {
  followerList: Array<User>;
  clubId: number;
  data: MeQuery;
};

const ClubFollowButton: React.FC<Props> = ({
  followerList,
  clubId,
  data,
  ...props
}) => {
  const isLoggedIn = useIsLoggedIn();
  const [isFollowing, setIsFollowing] = React.useState(
    isLoggedIn
      ? followerList.map((user) => user.id).includes(data.me!.id)
      : false
  );
  const [, followClub] = useFollowClubMutation();
  const [, unfollowClub] = useUnfollowClubMutation();
  const toast = useToast();
  const isMobile = useIsMobileScreen();

  const handleButton = async (): Promise<void> => {
    if (!isLoggedIn) {
      handleNotLoggedin(toast);
      return;
    }

    if (!isFollowing) {
      handleFollow();
    } else {
      handleUnfollow();
    }
    setIsFollowing(!isFollowing);
  };

  const handleFollow = async (): Promise<void> => {
    const { error } = await followClub({
      followerId: data.me!.id,
      clubId: clubId,
    });
    if (error) {
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
      followerId: data.me!.id,
      clubId: clubId,
    });

    console.log(error);
  };

  if (!data) {
    return <Button isLoading={true}>Follow</Button>;
  }
  return (
    <Button
      leftIcon={
        isFollowing ? <MinusIcon w={2} h={2} /> : <AddIcon w={2} h={2} />
      }
      variant={isFollowing ? "outline" : "solid"}
      onClick={(e) => {
        e.stopPropagation();
        handleButton();
      }}
      size={isMobile ? "xs" : "sm"}
      {...props}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export { ClubFollowButton };
