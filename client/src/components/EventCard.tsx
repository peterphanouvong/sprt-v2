import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import {
  Event,
  useAddAttendeeMutation,
  useMeQuery,
  User,
  useRemoveAttendeeMutation,
} from "../generated/graphql";
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
  const [, removeAttendee] = useRemoveAttendeeMutation();
  const toast = useToast();

  const router = useRouter();

  const isMobile = useIsMobileScreen();
  const [{ data: userData }] = useMeQuery();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const [isAttending, setIsAttending] = React.useState<boolean>(
    event.attendees.map((user) => user.id).includes(userData?.me?.id as number)
  );

  const onClose = () => setIsOpen(false);

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

      <VStack alignItems="stretch">
        <Button onClick={handleButton} mt={4}>
          {isAttending ? "Leave" : "Join"}
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

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
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
              <Button colorScheme="red" onClick={leaveEvent} ml={3}>
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
