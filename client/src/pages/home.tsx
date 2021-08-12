import React, { useEffect, useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { Event, useEventsQuery, useMeQuery } from "../generated/graphql";
import { Box, Spinner, VStack } from "@chakra-ui/react";
import { CreateEvent } from "../components/CreateEvent";
import { EventCard } from "../components/EventCard";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  const [{ data, fetching }] = useEventsQuery();
  const [{ data: meData }] = useMeQuery();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setEvents(data.events);
    }
  }, [data]);

  const addEvent = (e: Event) => {
    setEvents([e, ...events]);
  };

  const removeEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const editEvent = (e: Event) => {
    setEvents(
      events.map((event) => {
        if (e.id === event.id) return e;
        return event;
      })
    );
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
        {events
          .sort((a, b) => b.updatedAt - a.updatedAt)
          .map((e) => {
            return (
              <EventCard
                key={e.id}
                event={e}
                removeEvent={removeEvent}
                editEvent={editEvent}
              />
            );
          })}
      </VStack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
