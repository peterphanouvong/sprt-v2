import { Box, VStack, Spinner } from "@chakra-ui/react";
import React from "react";
import { Event } from "../generated/graphql";
import { EventCard } from "./EventCard";

interface Props {
  events: Event[];
}

const EventList: React.FC<Props> = ({ events }) => {
  return (
    <>
      <Box mt={4} />
      <VStack spacing={4} align="stretch">
        {events
          .sort((a: any, b: any) => b.updatedAt - a.updatedAt)
          //@ts-ignore
          .map((e: Event) => {
            return <EventCard event={e} key={e.id} />;
          })}
      </VStack>
    </>
  );
};

export { EventList };
