import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import { Attendee, useRemoveAttendeeMutation } from "../generated/graphql";

interface Props {
  attendee: Attendee;
  eventId: number;
}

export const EventAttendeeDeleteModal: React.FC<Props> = ({
  attendee,
  eventId,
}) => {
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const [, removeAttendee] = useRemoveAttendeeMutation();

  const removeWaitlistAttendee = () => {
    console.log(attendee);
    removeAttendee({ attendeeId: attendee.id, eventId });
    setIsAlertOpen(false);
  };

  return (
    <>
      <MenuItem color="red.500" onClick={() => setIsAlertOpen(true)}>
        Delete
      </MenuItem>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove Attendee
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action and {attendee.firstname}{" "}
              will have to sign up again.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setIsAlertOpen(false)}
                variant="ghost"
                colorScheme="gray"
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={removeWaitlistAttendee} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
