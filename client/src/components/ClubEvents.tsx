import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Event } from "../generated/graphql";
import { EventList } from "./EventList";
import waiting from "../images/waiting.svg";
import Image from "next/image";

interface Props {
  events: Event[];
  mine?: boolean;
}

const ClubEvents: React.FC<Props> = ({ events, mine = false }) => {
  return (
    <Box mt={5}>
      <Heading variant="h4" as="h4">
        Events
      </Heading>

      {events.length === 0 ? (
        <VStack>
          <Box paddingX={16} paddingY={5}>
            <Image src={waiting} />
          </Box>
          <Text variant="body-2">
            Looks like there aren't any events yet...
          </Text>
        </VStack>
      ) : (
        // <Image src={waiting} alt="Segun Adebayo" />
        <EventList mine={mine} events={events} />
      )}
    </Box>
  );
};

export { ClubEvents };
