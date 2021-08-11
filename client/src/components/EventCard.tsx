import { DeleteIcon } from "@chakra-ui/icons";
import { Heading, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { useDeleteEventMutation } from "../generated/graphql";
import { Event } from "../models";
import { Card } from "./Card";
import { EditEvent } from "./EditEvent";

interface Props {
  event: Event;

  removeEvent: (id: any) => void;
}

const EventCard: React.FC<Props> = ({
  event,

  removeEvent,
}) => {
  const [, deleteEvent] = useDeleteEventMutation();

  return (
    <Card>
      <Heading>{event.title}</Heading>
      <Text>{event.description}</Text>
      <Text>{event.location}</Text>
      <Text>{event.host.username}</Text>
      <Text>{event.datetime}</Text>
      <IconButton
        aria-label="delete event"
        icon={<DeleteIcon />}
        onClick={async () => {
          const success = await deleteEvent({ id: event.id });
          if (!success) {
            console.log("event doesn't exist");
          } else {
            removeEvent(event.id);
          }
        }}
      />
      <EditEvent event={event} />
    </Card>
  );
};

export { EventCard };
