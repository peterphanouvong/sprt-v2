import React, { useEffect, useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { useEventsQuery, useMeQuery } from "../generated/graphql";
import { Box, Spinner, VStack } from "@chakra-ui/react";
import { CreateEvent } from "../components/CreateEvent";
import { EventCard } from "../components/EventCard";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  const [{ data, fetching }] = useEventsQuery();
  const [{ data: meData }] = useMeQuery();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (data) setEvents(data.events);
  }, [data]);

  const addEvent = (e) => {
    setEvents([e, ...events]);
  };

  const removeEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  if (!fetching && !events) {
    return <div>No data...</div>;
  }

  if (!events) {
    return <Spinner />;
  }

  return (
    <Layout>
      {meData?.me && <CreateEvent addEvent={addEvent} />}
      <Box mt={4} />
      <VStack spacing={4} align="stretch">
        {events.map((e) => {
          return <EventCard key={e.id} event={e} removeEvent={removeEvent} />;
        })}
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
