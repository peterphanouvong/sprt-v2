import { ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Event } from "../models";
import { parseDatePretty } from "../utils/parseDate";
import { MetaDataText } from "./ MetaDataText";
import { Card } from "./Card";
import { ClubIcon } from "./ClubIcon";
import { DeleteEvent } from "./DeleteEvent";
import { EditEvent } from "./EditEvent";

interface Props {
  event: Event;
  removeEvent: (id: any) => void;
  editEvent: (e: Event) => void;
}

const EventCard: React.FC<Props> = ({ event, removeEvent, editEvent }) => {
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
              <EditEvent editEvent={editEvent} event={event} />
              <DeleteEvent removeEvent={removeEvent} eventId={event.id} />
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Button mt={4} isFullWidth={true} variant="solid">
        Join
      </Button>
    </Card>
  );
};

export { EventCard };
