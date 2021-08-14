import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import {
  Club,
  useClubsQuery,
  useDeleteClubMutation,
  useMeQuery,
} from "../generated/graphql";
import { Card } from "../components/Card";
import { Box, Heading, MenuItem, Spinner, Text } from "@chakra-ui/react";
import CreateClub from "../components/CreateClub";
import { OptionsButton } from "../components/OptionsButton";
import { DeleteEntity } from "../components/DeleteEntity";
import { WarningIcon } from "@chakra-ui/icons";

interface Props {}

const Clubs: React.FC<Props> = ({}) => {
  const [{ data, fetching }] = useClubsQuery();
  const [, deleteClub] = useDeleteClubMutation();
  const [{ data: userData }] = useMeQuery();

  const isAuthorised = (club: Club) => {
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

  if (!fetching && !data) {
    return <div>No data...</div>;
  }

  if (!data) {
    return <Spinner />;
  }

  return (
    <Layout>
      {data.clubs.map((e: Club) => {
        console.log(e);
        return (
          <Card key={e.id}>
            <Box display='flex' justifyContent='space-between'>
              <Box>
                <Heading>{e.name}</Heading>
                {e.admins.map((admin) => (
                  <Text key={admin.username}>Owner: {admin.username}</Text>
                ))}
                <Text>Email: {e.email}</Text>
                <Text>{e.description}</Text>
              </Box>
              {/* <Text>{e.host.username}</Text> */}
              <OptionsButton>
                {isAuthorised(e) ? (
                  <>
                    <DeleteEntity
                      handleDelete={() => handleDelete(e.id)}
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
      })}
      <CreateClub />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Clubs);
