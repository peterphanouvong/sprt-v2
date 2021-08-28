import { ButtonGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Event, User } from "../generated/graphql";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { Card } from "./Card";
import { EventCardHeader } from "./EventCardHeader";
import { EventCardHostAndLocation } from "./EventCardHostAndLocation";
import { EventJoinButton } from "./EventJoinButton";
import { EventMetaInfo } from "./EventMetaInfo";
import { EventOptionsButton } from "./EventOptionsButton";
import { ViewAttendeesModalButton } from "./ViewAttendeesModalButton";
interface Props {
  event: Event;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const router = useRouter();
  const isMobile = useIsMobileScreen();

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

      <ButtonGroup mt={2}>
        <EventJoinButton
          colorScheme="brand"
          size={isMobile ? "xs" : "sm"}
          event={event}
          attendees={event.attendees}
        />

        <ButtonGroup>
          <ViewAttendeesModalButton
            as="button"
            variant="outline"
            colorScheme="gray"
            capacity={event.capacity}
            attendees={event.attendees as User[]}
          />

          <EventOptionsButton
            eventId={event.id}
            onClick={(e) => e.stopPropagation()}
            colorScheme="gray"
            size={isMobile ? "xs" : "sm"}
            variant="outline"
          />
        </ButtonGroup>
      </ButtonGroup>

      <EventMetaInfo
        mt={2}
        location={event.location}
        startTime={event.startTime}
        endTime={event.endTime ?? undefined}
        capacity={event.capacity ?? undefined}
      />
    </Card>
  );
};

export { EventCard };
