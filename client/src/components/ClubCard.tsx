import { WarningIcon } from "@chakra-ui/icons";
import { Box, Heading, MenuItem, Text } from "@chakra-ui/react";
import React from "react";
import { Club, useDeleteClubMutation, useMeQuery } from "../generated/graphql";
import { Card } from "./Card";
import { DeleteEntity } from "./DeleteEntity";
import { OptionsButton } from "./OptionsButton";

interface Props {
  club: Club;
}

const ClubCard: React.FC<Props> = ({ club }) => {
  const [, deleteClub] = useDeleteClubMutation();
  const [{ data: userData }] = useMeQuery();

  const isAuthorised = (club: Club) => {
    if (!userData) {
      return false;
    }
    return club.admins
      .map((admin) => admin.username)
      .includes(userData.me?.username);
  };

  const handleDelete = async (id: number): Promise<string | null> => {
    const { error } = await deleteClub({ id });
    if (error) {
      console.log(error);
      return error.message;
    }
    return null;
  };
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
        {/* <Text>{club.host.username}</Text> */}
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
    </Card>
  );
};

export { ClubCard };
