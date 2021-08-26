import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { Event } from "../generated/graphql";
import { parseDatePretty } from "../utils/parseDate";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { Card } from "./Card";
import { EventDeleteButton } from "./EventDeleteButton";
import { EventEditButton } from "./EventEditButton";
import { ViewAttendeesModalButton } from "./ViewAttendeesModalButton";

interface Props {
  event: Event;
}

const MyEventCard: React.FC<Props> = ({ event }) => {
  const isMobile = useIsMobileScreen();

  return (
    <Card>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Box>
          <Box>
            <Flex alignItems="center">
              <Heading variant="h3" as="h3">
                <NextLink href={`/event/${event.id}`}>
                  <Link>{event.title}</Link>
                </NextLink>
              </Heading>
              <NextLink href={`/event/${event.id}`}>
                <IconButton
                  variant="ghost"
                  size={isMobile ? "sm" : "md"}
                  aria-label="view event"
                  icon={<ExternalLinkIcon />}
                />
              </NextLink>
            </Flex>
            <Text variant="label">
              {parseDatePretty(event.startTime)} [{event.location}]
            </Text>
          </Box>
        </Box>

        <ViewAttendeesModalButton
          capacity={event.capacity}
          attendees={event.attendees}
          eventTitle={event.title}
          eventId={event.id}
        />
      </Box>
      <Divider my={2} />

      <ButtonGroup alignItems="center">
        <EventEditButton as="button" event={event} />
        <EventDeleteButton as="button" eventId={event.id} />
        <NextLink href={`/event-info/${event.id}`}>
          <Button
            colorScheme="orange"
            size={isMobile ? "xs" : "sm"}
            variant="outline"
          >
            View attendees
          </Button>
        </NextLink>
      </ButtonGroup>
    </Card>
  );
};

export { MyEventCard };
