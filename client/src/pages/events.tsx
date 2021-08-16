import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { Event, useEventsQuery, useMeQuery } from "../generated/graphql";
import { Box, Grid, Spinner, VStack } from "@chakra-ui/react";
import { CreateEvent } from "../components/CreateEvent";
import { EventCard } from "../components/EventCard";
import { Card } from "../components/Card";
import { useIsAuth } from "../utils/useIsAuth";
interface Props {}

const Events: React.FC<Props> = ({}) => {
  useIsAuth();
  const [{ data, fetching }] = useEventsQuery();
  const [{ data: meData }] = useMeQuery();

  if (!fetching && !data) {
    return <div>No data...</div>;
  }

  if (!data) {
    return <Spinner />;
  }

  return (
    <Layout>
      <Grid alignItems="flex-start" templateColumns="5fr 2fr" gap={4}>
        <Box>
          {meData?.me && <CreateEvent />}
          <Box mt={4} />
          <VStack spacing={4} align="stretch">
            {data?.events
              .sort((a: any, b: any) => b.updatedAt - a.updatedAt)
              //@ts-ignore
              .map((e: Event) => {
                return <EventCard event={e} key={e.id} />;
              })}
          </VStack>
        </Box>
        <Card></Card>
      </Grid>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Events);
