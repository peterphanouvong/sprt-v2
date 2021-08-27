import { WarningIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import { useRouter } from "next/router";
import React from "react";
import {
  Event,
  useAddAttendeeMutation,
  useMeQuery,
  User,
  useRemoveAttendeeMutation,
} from "../generated/graphql";
import { parseDatePretty } from "../utils/parseDate";
import { useGetClubName } from "../utils/useGetClubName";
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
  const [, removeAttendee] = useRemoveAttendeeMutation();
  const toast = useToast();
  const router = useRouter();

  const [{ data: userData }] = useMeQuery();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const [isAttending, setIsAttending] = React.useState<boolean>(
    event.attendees.map((user) => user.id).includes(userData?.me?.id as number)
  );

  const onClose = () => setIsOpen(false);
  const clubname = useGetClubName(event.clubId as number);

  const handleButton = async () => {
    if (!isAttending) {
      await joinEvent();
    } else {
      console.log("already joined");
      setIsOpen(true); // confirm if user wants to leave event
    }
  };

  const leaveEvent = async () => {
    await removeAttendee({
      eventId: event.id,
      attendeeId: userData?.me?.id as number,
    });
    toast({
      title: "Left event",
      variant: "subtle",
      description: `You are no longer attending "${event.title}"`,
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    setIsAttending(false);
    setIsOpen(false);
  };

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
      setIsAttending(true);
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
    <Card onClick={() => router.push(`/event/${event.id}`)}>
      <Box
        mb={4}
        display='flex'
        justifyContent='space-between'
        alignItems='flex-end'
      >
        <Box>
          <Box>
            <HStack mb={2}>
              <ClubIcon />
              <Box>
                <Text variant='label' fontWeight='semibold'>
                  {event.host.username}
                  <Text fontWeight='normal' display='inline'>
                    {" "}
                    {/* is hosting {clubname && `for ${clubname}`} */}
                    is hosting
                    {clubname && (
                      <Text display='inline'>
                        {" "}
                        for{" "}
                        <NextLink href={`/club/${event.clubId}`}>
                          <Link>{clubname}</Link>
                        </NextLink>
                      </Text>
                    )}
                  </Text>
                </Text>
              </Box>
            </HStack>

            <Heading variant='h3' as='h3'>
              <NextLink href={`/event/${event.id}`}>
                <Link>{event.title}</Link>
              </NextLink>
            </Heading>
            <Text variant='label'>
              {parseDatePretty(event.startTime)} [{event.location}]
            </Text>
          </Box>
        </Box>

        <Box textAlign='right'>
          <OptionsButton>
            {userData ? (
              userData.me?.id === event.host.id ? (
                <>
                  <EventEditButton as='modalItem' event={event} />
                  <EventDeleteButton as='modalItem' eventId={event.id} />
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

      <VStack alignItems='stretch'>
        <Button onClick={handleButton} mt={4}>
          {isAttending ? "Leave" : "Join"}
        </Button>

        <ViewAttendeesModalButton
          as='button'
          buttonSize='md'
          capacity={event.capacity}
          attendees={event.attendees as User[]}
          eventId={event?.id}
          eventTitle={event?.title}
        />
      </VStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Leave Event
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You may lose your current spot.
            </AlertDialogBody>

            <AlertDialogFooter>
              {/*@ts-ignore*/}
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={leaveEvent} ml={3}>
                Leave
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Card>
  );
};

export { EventCard };
