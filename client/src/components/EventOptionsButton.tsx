import { DownloadIcon, WarningIcon } from "@chakra-ui/icons";
import {
  ButtonProps,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
} from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { Event, useEventQuery, useMeQuery } from "../generated/graphql";
import { EventDeleteButton } from "./EventDeleteButton";
import { EventEditButton } from "./EventEditButton";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";

type Props = ButtonProps & {
  eventId: number;
};

const EventOptionsButton: React.FC<Props> = ({ eventId, ...props }) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ data: eventData, fetching: fetchingEvent }] = useEventQuery({
    pause: eventId === -1,
    variables: {
      id: eventId,
    },
  });
  const isMobile = useIsMobileScreen();

  if (!eventData) {
    return (
      <Skeleton p={0} mb={1}>
        <DownloadIcon />
      </Skeleton>
    );
  }

  return (
    <Skeleton isLoaded={!fetching && !fetchingEvent && !!eventData}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<ChevronDownIcon />}
          size={isMobile ? "xs" : "sm"}
          colorScheme='gray'
          onClick={(e) => e.stopPropagation()}
          {...props}
        />
        <MenuList>
          {data?.me?.id === eventData?.event?.hostId ? (
            <>
              <EventEditButton
                as='modalItem'
                event={eventData.event as Event}
              />
              <EventDeleteButton as='modalItem' eventId={eventId} />
              <MenuItem
                onClick={() =>
                  router.push(`/event-info/${eventData?.event?.id}`)
                }
                icon={<DownloadIcon />}
              >
                Export attendees
              </MenuItem>
            </>
          ) : (
            <MenuItem
              onClick={(e) => e.stopPropagation()}
              icon={<WarningIcon />}
            >
              Report
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Skeleton>
  );
};

export { EventOptionsButton };
