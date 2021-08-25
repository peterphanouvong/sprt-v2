import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { Club, useClubsQuery } from "../generated/graphql";

import { Spinner, VStack } from "@chakra-ui/react";
import { ClubCreateButton } from "../components/ClubCreateButton";
import { ClubCard } from "../components/ClubCard";
import { useIsAuth } from "../utils/useIsAuth";
import { ClubSimpleCard } from "../components/ClubSimpleCard";

interface Props {}

const Clubs: React.FC<Props> = ({}) => {
  useIsAuth();
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
        <ClubCreateButton />
        {data.clubs
          .sort((clubA, clubB) => clubA.id - clubB.id)
          .map((club: Club) => {
            console.log(club);
            return <ClubSimpleCard key={club.id} club={club} hasLink />;
          })}
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Clubs);
