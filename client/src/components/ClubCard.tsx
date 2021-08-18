import { WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  MenuItem,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import {
  Club,
  useAddRequestedMemberMutation,
  // useDeleteClubMutation,
  useMeQuery,
  User,
} from "../generated/graphql";
import { AccordionUsers } from "./AccordionUsers";
import { Card } from "./Card";
import { ClubEditButton } from "./ClubEditButton";
import { ClubFollowButton } from "./ClubFollowButton";
import { OptionsButton } from "./OptionsButton";
import { ClubDeleteButton } from "./ClubDeleteButton";

interface Props {
  club: Club;
}

const ClubCard: React.FC<Props> = ({ club }) => {
  // const [, deleteClub] = useDeleteClubMutation();
  const [{ data: userData }] = useMeQuery();
  const [, addRequestedMember] = useAddRequestedMemberMutation();
  const toast = useToast();

  const [hasRequestedToJoin, setHasRequestedToJoin] = React.useState(false);

  const [followers, setFollowers] = React.useState(club.followers);

  const isAuthorised = (club: Club) => {
    if (!userData) {
      return false;
    }
    return club.admins
      .map((admin) => admin.username)
      .includes(userData.me!.username);
  };

  const addFollower = () => {
    setFollowers([...followers, userData!.me as User]);
  };

  const removeFollower = () => {
    console.log(followers);
    const newFollowers = followers.filter(
      (user) => user.id !== userData!.me!.id
    );
    console.log(newFollowers);
    setFollowers(newFollowers);
  };

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

  if (!userData) {
    return <Skeleton height="250px"></Skeleton>;
  }

  return (
    <Card>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Heading>{club.name}</Heading>
          {club.admins.map((admin) => (
            <Text key={admin.username}>Owner: {admin.username}</Text>
          ))}
          <Text>Email: {club.email}</Text>
          <Text>{club.description}</Text>
        </Box>
        <OptionsButton>
          {isAuthorised(club) ? (
            <>
              <ClubEditButton club={club} />
              <ClubDeleteButton clubId={club.id} />
            </>
          ) : (
            <MenuItem icon={<WarningIcon />}>Report</MenuItem>
          )}
        </OptionsButton>
      </Box>
      <ClubFollowButton
        followerList={club.followers}
        clubId={club.id}
        data={userData}
        addFollower={addFollower}
        removeFollower={removeFollower}
      />
      <AccordionUsers userType={"Followers"} userList={followers} />
      <Button colorScheme="orange" mt={2} onClick={requestToJoinClub}>
        {hasRequestedToJoin ? "Already requested" : "Request to join"}
      </Button>
    </Card>
  );
};

export { ClubCard };
