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
  useDeleteClubMutation,
  useMeQuery,
  User,
} from "../generated/graphql";
import { AccordionUsers } from "./AccordionUsers";
import { Card } from "./Card";
import { DeleteEntity } from "./DeleteEntity";
import { FollowClub } from "./FollowClub";
import { OptionsButton } from "./OptionsButton";

interface Props {
  club: Club;
}

const ClubCard: React.FC<Props> = ({ club }) => {
  const [, deleteClub] = useDeleteClubMutation();
  const [{ data: userData }] = useMeQuery();
  const [, addRequestedMember] = useAddRequestedMemberMutation();
  const toast = useToast();

  const [followers, setFollowers] = React.useState(club.followers);

  const isAuthorised = (club: Club) => {
    if (!userData) {
      return false;
    }
    return club.admins
      .map((admin) => admin.username)
      .includes(userData.me?.username);
  };

  const addFollower = () => {
    setFollowers([...followers, userData.me as User]);
  };

  const removeFollower = () => {
    console.log(followers);
    const newFollowers = followers.filter((user) => user.id !== userData.me.id);
    console.log(newFollowers);
    setFollowers(newFollowers);
  };

  const handleDelete = async (id: number): Promise<string | null> => {
    const { error } = await deleteClub({ id });
    if (error) {
      console.log(error);
      return error.message;
    }
    return null;
  };

  const requestToJoinClub = async () => {
    const { data, error } = await addRequestedMember({
      userId: userData.me.id,
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
              <DeleteEntity
                handleDelete={() => handleDelete(club.id)}
                entityName={"Club"}
              />
            </>
          ) : (
            <MenuItem icon={<WarningIcon />}>Report</MenuItem>
          )}
        </OptionsButton>
      </Box>
      <FollowClub
        followerList={club.followers}
        clubId={club.id}
        data={userData}
        addFollower={addFollower}
        removeFollower={removeFollower}
      />
      <AccordionUsers userType={"Followers"} userList={followers} />
      <Button colorScheme="orange" mt={2} onClick={requestToJoinClub}>
        Request to join
      </Button>
    </Card>
  );
};

export { ClubCard };
