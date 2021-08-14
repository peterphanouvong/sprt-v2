import { AddIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  MenuItem,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import {
  Club,
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

  const handleDelete = async (id: number): Promise<string | null> => {
    const { error } = await deleteClub({ id });
    if (error) {
      console.log(error);
      return error.message;
    }
    return null;
  };

  if (!userData) {
    return <Skeleton height='250px'></Skeleton>;
  }

  return (
    <Card>
      <Box display='flex' justifyContent='space-between'>
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
      />
      <AccordionUsers userType={"Followers"} userList={followers} />
    </Card>
  );
};

export { ClubCard };
