import { MenuItem } from "@chakra-ui/menu";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Maybe, useDeleteEventMutation } from "../generated/graphql";

interface Props {
  event: {
    __typename?: "Event" | undefined;
    id: number;
    title: string;
    date?: Maybe<string> | undefined;
    capacity?: Maybe<number> | undefined;
    numWaitlist: number;
    numConfirmed: number;
  };
}

export const EventDeleteModal: React.FC<Props> = ({ event }) => {
  const [, deleteEvent] = useDeleteEventMutation();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const confirmDelete = (event) => {
    console.log("Delete event" + event.id);
    deleteEvent({ id: event.id.toString() });
  };

  return (
    <>
      <MenuItem
        color='red.500'
        onClick={() => {
          // console.log("Delete event" + event.id);
          // deleteEvent({ id: event.id.toString() });
          setIsOpen(true);
        }}
      >
        Delete
      </MenuItem>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Event: {event.title}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                variant='ghost'
                colorScheme='gray'
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => confirmDelete(event)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
