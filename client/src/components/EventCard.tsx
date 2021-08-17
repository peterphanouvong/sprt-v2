import { ChevronRightIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  MenuItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Event, useAddAttendeeMutation, User } from "../generated/graphql";

import { useMeQuery } from "../generated/graphql";
import { parseDatePretty } from "../utils/parseDate";
import { MetaDataText } from "./ MetaDataText";
import { Card } from "./Card";
import { ClubIcon } from "./ClubIcon";
import { EventDeleteButton } from "./EventDeleteButton";
import { EventEditButton } from "./EventEditButton";
import { OptionsButton } from "./OptionsButton";
import { ViewAttendeesModalButton } from "./ViewAttendeesModalButton";
import parse from "html-react-parser";

interface Props {
  event: Event;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const [, addAttendee] = useAddAttendeeMutation();
  const [attendees, setAttendees] = useState<User[]>(event.attendees);
  const toast = useToast();
  const [{ data }] = useMeQuery();

  const joinEvent = async () => {
    const { error, data } = await addAttendee({ eventId: event.id });

    if (data && !error) {
      // @ts-ignore
      setAttendees([...attendees, data.addAttendee]);
      toast({
        title: "Joined event",
        variant: "subtle",
        description: `We've added you as an attendee to "${event.title}"`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else if (error) {
      toast({
        title: "Error",
        variant: "subtle",
        position: "top",
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!data) return <>loading...</>;
  return (
    <Card>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Box display="flex" alignItems="center">
            <ClubIcon />
            <Box mr={4}></Box>
            <Box>
              <Heading fontSize="x-large">UTS: {event.title}</Heading>
              <MetaDataText>
                {parseDatePretty(event.startTime)} -{" "}
                {parseDatePretty(event.endTime)} [
                {Intl.DateTimeFormat().resolvedOptions().timeZone}]
              </MetaDataText>
              <Box mt={-1}>
                <MetaDataText>Hosted by </MetaDataText>
                <MetaDataText>{event.host.username}</MetaDataText>{" "}
                <MetaDataText>
                  <ChevronRightIcon /> {event.location}
                </MetaDataText>
              </Box>
            </Box>
          </Box>
          <Text mt={4}>{parse(event.description)}</Text>
        </Box>

        <Box float="right">
          <OptionsButton>
            {data.me?.id === event.host.id ? (
              <>
                <EventEditButton event={event} />
                <EventDeleteButton eventId={event.id} />
              </>
            ) : (
              <MenuItem icon={<WarningIcon />}>Report</MenuItem>
            )}
          </OptionsButton>
        </Box>
      </Box>

      <ViewAttendeesModalButton
        capacity={event.capacity}
        attendees={attendees}
        joinEvent={joinEvent}
      />

      <Button onClick={joinEvent} mt={4} isFullWidth={true} variant="solid">
        Join
      </Button>
    </Card>
  );
};

export { EventCard };
