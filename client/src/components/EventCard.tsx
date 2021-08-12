import { ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
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
import { Card } from "./Card";
import { ClubIcon } from "./ClubIcon";
import { DeleteEvent } from "./DeleteEvent";
import { EditEvent } from "./EditEvent";

interface Props {
  event: Event;
  removeEvent: (id: any) => void;
}

const EventCard: React.FC<Props> = ({ event, removeEvent }) => {
  return (
    <Card>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Box display="flex" alignItems="center">
            <ClubIcon />
            <Box mr={4}></Box>
            <Box>
              <Heading fontSize="x-large">UTS: {event.title}</Heading>
              <Text color="GrayText">{parseDatePretty(event.datetime)}</Text>
              <Text color="GrayText">
                Hosted by{" "}
                <Text display="inline" textTransform="capitalize">
                  {event.host.username}
                </Text>{" "}
                <ChevronRightIcon /> {event.location}
              </Text>
            </Box>
          </Box>

          <Text mt={4}>{event.description}</Text>
        </Box>

        <Box float="right" top={0}>
          <Menu>
            <MenuButton
              as={IconButton}
              border="none"
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <EditEvent event={event} />
              <DeleteEvent removeEvent={removeEvent} eventId={event.id} />
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Card>
  );
};

export { EventCard };
