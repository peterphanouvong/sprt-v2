import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";
import { EventList } from "../components/EventList";
import { EventCreateButton } from "../components/EventCreateButton";
import { useEventsQuery, useMeQuery, Event } from "../generated/graphql";
import { Spinner } from "@chakra-ui/react";
import Head from "next/head";

interface Props {}

const Events: React.FC<Props> = ({}) => {
  useIsAuth();
  const [{ data: meData }] = useMeQuery();
  const [{ data, fetching }] = useEventsQuery();

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
      <Head>
        <title>Events | sprt</title>
      </Head>
      {meData?.me && <EventCreateButton />}
      <EventList events={data.events as Event[]} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Events);
