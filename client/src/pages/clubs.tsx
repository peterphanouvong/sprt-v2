import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { Club, useClubsQuery, useMeQuery } from "../generated/graphql";

import { Spinner, VStack } from "@chakra-ui/react";
import { ClubCreateButton } from "../components/ClubCreateButton";
import { useIsAuth } from "../utils/useIsAuth";
import { ClubSimpleCard } from "../components/ClubSimpleCard";
import Head from "next/head";
import { Card } from "../components/Card";

interface Props {}

const Clubs: React.FC<Props> = ({}) => {
  useIsAuth();
  const [{ data, fetching }] = useClubsQuery();
  const [{ data: userData }] = useMeQuery();

  if (!fetching && !data) {
    return <div>No data...</div>;
  }

  if (!data) {
    return <Spinner />;
  }

  return (
    <Layout>
      <Head>
        <title>Clubs | sprt</title>
      </Head>
      <VStack spacing={4} align='stretch'>
        <ClubCreateButton />
        {data.clubs
          .sort((clubA, clubB) => clubA.id - clubB.id)
          .map((club: Club) => {
            console.log(club);
            return (
              <Card>
                <ClubSimpleCard
                  key={club.id}
                  club={club}
                  userData={userData}
                  hasLink
                />
              </Card>
            );
          })}
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Clubs);
