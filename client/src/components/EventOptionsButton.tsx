import { DownloadIcon, WarningIcon } from "@chakra-ui/icons";
import { MenuItem, Skeleton } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { Event, useEventQuery, useMeQuery } from "../generated/graphql";
import { EventDeleteButton } from "./EventDeleteButton";
import { EventEditButton } from "./EventEditButton";
import { OptionsButton } from "./OptionsButton";

interface Props {
  eventId: number;
}

const EventOptionsButton: React.FC<Props> = ({ eventId }) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ data: eventData, fetching: fetchingEvent }] = useEventQuery({
    pause: eventId === -1,
    variables: {
      id: eventId,
    },
  });

  if (!eventData) {
    return (
      <Skeleton width="30px" mb={1}>
        <DownloadIcon />
      </Skeleton>
    );
  }

  return (
    <Skeleton isLoaded={!fetching && !fetchingEvent && !!eventData}>
      <OptionsButton>
        {data?.me?.id === eventData?.event?.hostId ? (
          <>
            <EventEditButton event={eventData.event as Event} />
            <EventDeleteButton eventId={eventId} />
            <MenuItem
              onClick={() => router.push(`/event-info/${eventData?.event?.id}`)}
              icon={<DownloadIcon />}
            >
              Export attendees
            </MenuItem>
          </>
        ) : (
          <MenuItem icon={<WarningIcon />}>Report</MenuItem>
        )}
      </OptionsButton>
    </Skeleton>
  );
};

export { EventOptionsButton };
