import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";
import { EventList } from "../components/EventList";

import { Event, useMeQuery, useMyFeedQuery } from "../generated/graphql";
import { Spinner } from "@chakra-ui/react";
import { RenderPrettyJSON } from "../utils/renderPrettyJSON";
import { useRouter } from "next/router";
import { PublicFeed } from "../components/PublicFeed";

interface Props {}

const Feed: React.FC<Props> = ({}) => {
  useIsAuth();
  // const router = useRouter();
  const [{ data, fetching }] = useMeQuery();
  // const [{ data, fetching }] = useMyFeedQuery();

  // // console.log("fn", fn);
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

  // if()

  return (
    <Layout>
      {/* <RenderPrettyJSON object={data} /> */}
      <PublicFeed userId={data.me?.id as number} />
      {/* <EventList events={data.myFeed as Event[]} /> */}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Feed);
