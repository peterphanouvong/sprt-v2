import { Skeleton } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { EventCreateButton } from "../components/EventCreateButton";
import { EventList } from "../components/EventList";
import { EventListSkeleton } from "../components/EventListSkeleton";
import { Layout } from "../components/Layout";
import { Event, useEventsQuery, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

interface Props {}

const Events: React.FC<Props> = ({}) => {
  useIsAuth();
  const [{ data: meData }] = useMeQuery();
  const [{ data, fetching }] = useEventsQuery();

  if (!fetching && !data) {
    return <div>No data...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>Events | sprt</title>
      </Head>
      {meData?.me ? (
        <EventCreateButton />
      ) : (
        <Skeleton height="40px" width="152.5px" borderRadius="md" />
      )}
      {!data ? (
        <EventListSkeleton />
      ) : (
        <EventList events={data.events as Event[]} />
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Events);
