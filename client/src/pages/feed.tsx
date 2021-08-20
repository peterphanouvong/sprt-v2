import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";

import { useMeQuery } from "../generated/graphql";
import { Spinner } from "@chakra-ui/react";
import { PublicFeed } from "../components/PublicFeed";

interface Props {}

const Feed: React.FC<Props> = ({}) => {
  useIsAuth();
  const [{ data, fetching }] = useMeQuery();

  if (!fetching && !data) {
    return <div>No data...</div>;
  }

  if (!data) {
    return (
      <Spinner
        position="absolute"
        left="50%"
        top="45vh"
        thickness="2px"
        speed="0.5s"
        emptyColor="gray.100"
        color="orange.500"
        size="lg"
      />
    );
  }

  return (
    <Layout>
      <PublicFeed userId={data.me?.id as number} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Feed);
