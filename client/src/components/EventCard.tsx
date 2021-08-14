import { ChevronRightIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  UnorderedList,
  MenuItem,
  Text,
  ListItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Event, useAddAttendeeMutation, User } from "../generated/graphql";
// import { Event } from "../models";
import { useMeQuery } from "../generated/graphql";
import { parseDatePretty } from "../utils/parseDate";
import { MetaDataText } from "./ MetaDataText";
import { AccordionUsers } from "./AccordionUsers";
import { Card } from "./Card";
import { ClubIcon } from "./ClubIcon";
import { DeleteEvent } from "./DeleteEvent";
import { EditEvent } from "./EditEvent";
import { OptionsButton } from "./OptionsButton";

interface Props {
  event: Event;
  // removeEvent: (id: any) => void;
  // editEvent: (e: Event) => void;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const [, addAttendee] = useAddAttendeeMutation();
  const [attendees, setAttendees] = useState<User[]>(event.attendees);

  const [{ data }] = useMeQuery();
  if (!data) return <>loading...</>;
  return (
    <Card>
      <Box display='flex' justifyContent='space-between'>
        <Box>
          <Box display='flex' alignItems='center'>
            <ClubIcon />
            <Box mr={4}></Box>
            <Box>
              <Heading fontSize='x-large'>UTS: {event.title}</Heading>
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
          <Text mt={4}>{event.description}</Text>
        </Box>

        <Box float='right'>
          <OptionsButton>
            {data.me?.id === event.host.id ? (
              <>
                <EditEvent event={event} />
                <DeleteEvent eventId={event.id} />
              </>
            ) : (
              <MenuItem icon={<WarningIcon />}>Report</MenuItem>
            )}
          </OptionsButton>
        </Box>
      </Box>

      <AccordionUsers userType={"Attendees"} userList={attendees} />

      <Button
        onClick={async () => {
          const res = await addAttendee({ eventId: event.id });
          console.log(res);
          if (res.data) {
            // @ts-ignore
            setAttendees([...attendees, res.data.addAttendee]);
          }
        }}
        mt={4}
        isFullWidth={true}
        variant='solid'
      >
        Join
      </Button>
    </Card>
  );
};

export { EventCard };
