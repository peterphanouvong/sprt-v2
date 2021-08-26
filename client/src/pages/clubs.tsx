import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { ClubCreateButton } from "../components/ClubCreateButton";
import { ClubList } from "../components/ClubList";
import { ClubListSkeleton } from "../components/ClubListSkeleton";
import { Layout } from "../components/Layout";
import { Club, useClubsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface Props {}

const Clubs: React.FC<Props> = ({}) => {
  const [{ data, fetching }] = useClubsQuery();

  if (!fetching && !data) {
    return <div>No data...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>Clubs | sprt</title>
      </Head>
      <ClubCreateButton />

      {data ? <ClubList clubs={data.clubs as Club[]} /> : <ClubListSkeleton />}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Clubs);
