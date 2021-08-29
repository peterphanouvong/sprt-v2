import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import {
  Club,
  useAddRequestedMemberMutation,
  useMeQuery,
} from "../generated/graphql";
import { handleNotLoggedin } from "../utils/handleNotLoggedIn";
import { useIsLoggedIn } from "../utils/useIsLoggedIn";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";

interface Props {
  club: Club;
}

const ClubJoinButton: React.FC<Props> = ({ club }) => {
  const [{ data: userData }] = useMeQuery();
  const [hasRequestedToJoin, setHasRequestedToJoin] = React.useState(false);
  const [, addRequestedMember] = useAddRequestedMemberMutation();
  const toast = useToast();
  const isMobile = useIsMobileScreen();
  const isLoggedIn = useIsLoggedIn();

  const requestToJoinClub = async () => {
    if (!isLoggedIn) {
      handleNotLoggedin(toast);
      return;
    }
    const { data, error } = await addRequestedMember({
      userId: userData!.me!.id,
      clubId: club.id,
    });

    if (!error && data) {
      toast({
        position: "top",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
        status: "success",
        title: `A request has been sent to "${club.name}".`,
        description: "Please wait for the club to accept your request.",
      });
    } else if (error) {
      toast({
        position: "top",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
        status: "error",
        title: `Error.`,
        description: error.message,
      });
    }

    setHasRequestedToJoin(true);
  };
  return (
    <Button
      variant={"outline"}
      colorScheme='gray'
      onClick={(e) => {
        e.stopPropagation();
        requestToJoinClub();
      }}
      size={isMobile ? "xs" : "sm"}
    >
      {hasRequestedToJoin ? "Requested" : "Request to join"}
    </Button>
  );
};

export { ClubJoinButton };
