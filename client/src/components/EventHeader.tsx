import { Box, Skeleton } from "@chakra-ui/react";
import React from "react";
import { useEventQuery } from "../generated/graphql";
import { EventCardHeader } from "./EventCardHeader";
import { EventCardHostAndLocation } from "./EventCardHostAndLocation";

interface Props {
  eventId: number;
}

const EventHeader: React.FC<Props> = ({ eventId }) => {
  const [{ data, fetching, error }] = useEventQuery({
    pause: eventId === -1,
    variables: {
      id: eventId,
    },
  });

  if (error) return <>there was an error</>;
  return (
    <Box>
      <Skeleton isLoaded={!!data?.event && !fetching}>
        <EventCardHeader
          id={data?.event?.id || 1}
          title={data?.event?.title || "title"}
        />
      </Skeleton>

      <Skeleton isLoaded={!!data?.event && !fetching}>
        <EventCardHostAndLocation
          clubName={data?.event?.club?.name}
          hostLastname={data?.event?.host.lastname || "last name"}
          hostFirstname={data?.event?.host.firstname || "firstname"}
        />
      </Skeleton>
    </Box>
  );
};

export { EventHeader };
