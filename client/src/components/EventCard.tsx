import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Event, useAddAttendeeMutation, User } from "../generated/graphql";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { Card } from "./Card";
import { EventCardHeader } from "./EventCardHeader";
import { EventCardHostAndLocation } from "./EventCardHostAndLocation";
import { ViewAttendeesModalButton } from "./ViewAttendeesModalButton";
interface Props {
  event: Event;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const [, addAttendee] = useAddAttendeeMutation();
  const toast = useToast();

  const router = useRouter();

  const isMobile = useIsMobileScreen();

  const joinEvent = async () => {
    const { error, data } = await addAttendee({ eventId: event.id });

    if (data && !error) {
      // @ts-ignore
      // setAttendees([...attendees, data.addAttendee]);
      toast({
        title: "Joined event",
        variant: "subtle",
        description: `We've added you as an attendee to "${event.title}"`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
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

  return (
    <Card
      onClick={isMobile ? () => router.push(`/event/${event.id}`) : undefined}
    >
      <EventCardHeader id={event.id} title={event.title} />
      <EventCardHostAndLocation
        clubName={event.club?.name}
        hostLastname={event.host.lastname}
        hostFirstname={event.host.firstname}
      />

      <Grid mt={2} gridGap={2} gridTemplateColumns="1fr 1fr">
        <Button
          size={isMobile ? "xs" : "sm"}
          onClick={(e) => {
            e.stopPropagation();
            joinEvent();
          }}
        >
          Join
        </Button>
        <ButtonGroup>
          <ViewAttendeesModalButton
            as="button"
            variant="outline"
            colorScheme="gray"
            capacity={event.capacity}
            attendees={event.attendees as User[]}
            eventId={event?.id}
            eventTitle={event?.title}
          />
          <IconButton
            onClick={(e) => e.stopPropagation()}
            colorScheme="gray"
            size={isMobile ? "xs" : "sm"}
            icon={<ChevronDownIcon />}
            variant="outline"
            aria-label="options"
          />
        </ButtonGroup>
      </Grid>
    </Card>
  );
};

export { EventCard };
