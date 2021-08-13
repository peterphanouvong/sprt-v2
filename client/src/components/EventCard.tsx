import { ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  IconButton,
  UnorderedList,
  Menu,
  MenuButton,
  MenuList,
  Text,
  ListItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Event, useAddAttendeeMutation, User } from "../generated/graphql";
// import { Event } from "../models";
import { parseDatePretty } from "../utils/parseDate";
import { MetaDataText } from "./ MetaDataText";
import { Card } from "./Card";
import { ClubIcon } from "./ClubIcon";
import { DeleteEvent } from "./DeleteEvent";
import { EditEvent } from "./EditEvent";

interface Props {
  event: Event;
  // removeEvent: (id: any) => void;
  // editEvent: (e: Event) => void;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const [, addAttendee] = useAddAttendeeMutation();
  const [attendees, setAttendees] = useState<User[]>(event.attendees);

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
                {parseDatePretty(event.datetime)} [
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

        <Box float="right">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="ghost"
            />
            <MenuList>
              <EditEvent event={event} />
              <DeleteEvent eventId={event.id} />
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Box mt={4}>
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight="medium">Attendees</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <UnorderedList>
                {attendees.map((attendee) => (
                  <ListItem key={attendee.id}>{attendee.username}</ListItem>
                ))}
              </UnorderedList>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

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
        variant="solid"
      >
        Join
      </Button>
    </Card>
  );
};

export { EventCard };
