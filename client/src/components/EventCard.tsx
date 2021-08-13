import { ChevronRightIcon, HamburgerIcon, WarningIcon } from "@chakra-ui/icons";
import {
  AlertIcon,
  Box,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import { Event } from "../models";
import { parseDatePretty } from "../utils/parseDate";
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
  const [{ data }] = useMeQuery();
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
              <Text color="GrayText">
                {parseDatePretty(event.datetime)} [
                {Intl.DateTimeFormat().resolvedOptions().timeZone}]
              </Text>
              <Box color="GrayText">
                Hosted by{" "}
                <Box display="inline" textTransform="capitalize">
                  {event.host.username}
                </Box>{" "}
                <ChevronRightIcon /> {event.location}
              </Box>
            </Box>
          </Box>

          <Text mt={4}>{event.description}</Text>
        </Box>

        <Box float="right">
          <Menu>
            <MenuButton
              as={IconButton}
              border="none"
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              {data.me?.id === event.host.id ? (
                <>
                  <EditEvent editEvent={editEvent} event={event} />
                  <DeleteEvent removeEvent={removeEvent} eventId={event.id} />
                </>
              ) : (
                <MenuItem icon={<WarningIcon />}>Report</MenuItem>
              )}
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Card>
  );
};

export { EventCard };
