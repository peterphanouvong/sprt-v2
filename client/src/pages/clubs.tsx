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
import { Heading, IconButton, Spinner, Text } from "@chakra-ui/react";
import CreateClub from "../components/CreateClub";
import { DeleteIcon } from "@chakra-ui/icons";

interface Props {}

const Clubs: React.FC<Props> = ({}) => {
  const [{ data, fetching }] = useClubsQuery();
  const [clubs, setClubs] = useState<ClubInterface[]>();
  const [, deleteClub] = useDeleteClubMutation();

  useEffect(() => {
    if (data) {
      // console.log(data.clubs);
      setClubs(data.clubs);
    }
  }, [data]);

  const addClub = (data: ClubInterface) => {
    console.log(data);
    setClubs([data, ...clubs]);
  };

  const removeClub = (id: number) => {
    const newClubs = clubs.filter((club) => club.id !== id);
    setClubs(newClubs);
  };

  if (!fetching && !data) {
    return <div>No data...</div>;
  }

  if (!clubs) {
    return <Spinner />;
  }

  return (
    <Layout>
      {clubs.map((e) => {
        console.log(e);
        return (
          <Card key={e.id}>
            <Heading>{e.name}</Heading>
            <Text>{e.description}</Text>
            <Text>{e.email}</Text>
            {/* <Text>{e.host.username}</Text> */}
            <IconButton
              mt={4}
              icon={<DeleteIcon />}
              aria-label="Delete post"
              onClick={async () => {
                const success = await deleteClub({ id: e.id });
                if (success) {
                  removeClub(e.id);
                }
              }}
            />
          </Card>
        );
      })}
      <CreateClub addClub={addClub} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Clubs);
