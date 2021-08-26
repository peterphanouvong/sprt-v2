import { WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  MenuItem,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import {
  Event,
  useAddAttendeeMutation,
  useMeQuery,
  User,
} from "../generated/graphql";
import { parseDatePretty } from "../utils/parseDate";
import { Card } from "./Card";
import { ClubIcon } from "./ClubIcon";
import { EventDeleteButton } from "./EventDeleteButton";
import { EventEditButton } from "./EventEditButton";
import { OptionsButton } from "./OptionsButton";
import { ViewAttendeesModalButton } from "./ViewAttendeesModalButton";

interface Props {
  event: Event;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const [, addAttendee] = useAddAttendeeMutation();
  const toast = useToast();
  const [{ data }] = useMeQuery();

  // const [hasJoined, setHasJoined] = useState(event.attendees.map())
  // const [attendees, setAttendees] = useState<User[]>(event.attendees);

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

  // if (!data) return <>loading...</>;
  return (
    <Card>
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Box>
          <Box>
            <HStack mb={2}>
              <ClubIcon />
              <Box>
                <Text variant="label" fontWeight="semibold">
                  {event.host.username}
                  <Text fontWeight="normal" display="inline">
                    {" "}
                    is hosting
                  </Text>
                </Text>
              </Box>
            </HStack>

            <Heading variant="h3" as="h3">
              <NextLink href={`/event/${event.id}`}>
                <Link>{event.title}</Link>
              </NextLink>
            </Heading>
            <Text variant="label">
              {parseDatePretty(event.startTime)} [{event.location}]
            </Text>
          </Box>
        </Box>

        <Box textAlign="right">
          <OptionsButton>
            {data ? (
              data.me?.id === event.host.id ? (
                <>
                  <EventEditButton as="modalItem" event={event} />
                  <EventDeleteButton as="button" eventId={event.id} />
                </>
              ) : (
                <MenuItem icon={<WarningIcon />}>Report</MenuItem>
              )
            ) : (
              <MenuItem>
                <Spinner />
              </MenuItem>
            )}
          </OptionsButton>
          <ViewAttendeesModalButton
            capacity={event.capacity}
            attendees={event.attendees}
            eventTitle={event.title}
            eventId={event.id}
            // joinEvent={joinEvent}
          />
        </Box>
      </Box>

      <VStack alignItems="stretch">
        <Button onClick={joinEvent} mt={4}>
          Join
        </Button>

        <ViewAttendeesModalButton
          as="button"
          buttonSize="md"
          capacity={event.capacity}
          attendees={event.attendees as User[]}
          eventId={event?.id}
          eventTitle={event?.title}
        />
      </VStack>
    </Card>
  );
};

export { EventCard };
