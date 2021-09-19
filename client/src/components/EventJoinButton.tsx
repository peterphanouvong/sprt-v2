import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import {
  useAddAttendeeMutation,
  User,
  useRemoveAttendeeMutation,
  Event,
  useMeQuery,
} from "../generated/graphql";
import { EventJoinWaitlistButton } from "./EventJoinWaitlistButton";

type Props = ButtonProps & {
  event: Event;
  attendees: User[];
};

const EventJoinButton: React.FC<Props> = ({ event, attendees, ...props }) => {
  const [, addAttendee] = useAddAttendeeMutation();
  const [, removeAttendee] = useRemoveAttendeeMutation();
  const [{ data: userData }] = useMeQuery();

  const toast = useToast();
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
    const { error } = await addAttendee({ eventId: event.id });
    if (!error) {
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

  const joinWaitlist = async () => {
    const { error } = await addAttendee({ eventId: event.id });
    if (!error) {
      toast({
        title: "Joined waitlist",
        variant: "subtle",
        description: `We've added you to the waitlist for "${
          event.title
        }". There are ${
          attendees.length - (event.capacity || 0)
        } in line ahead of you.`,
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
    <>
      {isAttending ? (
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            handleButton();
          }}
          {...props}
        >
          Leave event
        </Button>
      ) : event.capacity && attendees.length >= event.capacity ? (
        <EventJoinWaitlistButton joinWaitlist={joinWaitlist} />
      ) : (
        <Button
          variant="solid"
          onClick={(e) => {
            e.stopPropagation();
            handleButton();
          }}
          {...props}
        >
          Join event
        </Button>
      )}

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
              <Button
                colorScheme="gray"
                variant="ghost"
                /*@ts-ignore*/
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={leaveEvent} ml={3}>
                Leave event
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export { EventJoinButton };
