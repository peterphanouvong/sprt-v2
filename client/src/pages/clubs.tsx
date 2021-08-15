import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { Club, useClubsQuery } from "../generated/graphql";

import { Spinner, VStack } from "@chakra-ui/react";
import CreateClub from "../components/CreateClub";
import { ClubCard } from "../components/ClubCard";

interface Props {}

const Clubs: React.FC<Props> = ({}) => {
  const [{ data, fetching }] = useClubsQuery();

  if (!fetching && !data) {
    return <div>No data...</div>;
  }

  if (!data) {
    return <Spinner />;
  }

  return (
    <Layout>
      <VStack spacing={4} align='stretch'>
        <CreateClub />
        {/* {data.clubs.} */}
        {data.clubs
          .sort((clubA, clubB) => clubA.id - clubB.id)
          .map((club: Club) => {
            console.log(club);
            return <ClubCard key={club.id} club={club} />;
          })}
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Clubs);
