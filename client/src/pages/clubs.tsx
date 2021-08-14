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
      <CreateClub />
      {data.clubs.map((club: Club) => {
        console.log(club);
        return <ClubCard key={club.id} club={club} />;
      })}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Clubs);
