import React, { useEffect, useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import {
  Club as ClubInterface,
  useClubsQuery,
  useDeleteClubMutation,
} from "../generated/graphql";
import { Card } from "../components/Card";
import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import CreateClub from "../components/CreateClub";
import { OptionsButton } from "../components/OptionsButton";
import { DeleteEntity } from "../components/DeleteEntity";

interface Props {}

const Clubs: React.FC<Props> = ({}) => {
  const [{ data, fetching }] = useClubsQuery();
  const [, deleteClub] = useDeleteClubMutation();

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
      {data.clubs.map((e) => {
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
                <DeleteEntity
                  handleDelete={() => handleDelete(e.id)}
                  entityName={"Club"}
                />
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
