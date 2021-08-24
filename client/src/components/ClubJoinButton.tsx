import { Button, toast, useToast } from "@chakra-ui/react";
import React from "react";
import {
  Club,
  useMeQuery,
  useAddRequestedMemberMutation,
} from "../generated/graphql";

interface Props {
  club: Club;
}

const ClubJoinButton: React.FC<Props> = ({ club }) => {
  const [{ data: userData }] = useMeQuery();
  const [hasRequestedToJoin, setHasRequestedToJoin] = React.useState(false);
  const [, addRequestedMember] = useAddRequestedMemberMutation();
  const toast = useToast();

  const requestToJoinClub = async () => {
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
      colorScheme='orange'
      onClick={requestToJoinClub}
      size='xs'
    >
      {hasRequestedToJoin ? "Requested" : "Request to join"}
    </Button>
  );
};

export { ClubJoinButton };
