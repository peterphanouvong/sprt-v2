import { Heading, Spinner } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { BaseLayout } from "../components/BaseLayout";
import { useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  useIsAuth();
  const [{ data, fetching }] = useMeQuery();

  if (fetching) return <Spinner />;

  return (
    <BaseLayout>
      <Head>
        <title>Home | sprt</title>
      </Head>
      <Heading mb={2} variant="h1" as="h1">
        {data?.me?.clubName}
      </Heading>

      <Heading variant="h5" as="h5">
        Active Events
      </Heading>

      <Heading variant="h5" as="h5">
        Past Events
      </Heading>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Home);
