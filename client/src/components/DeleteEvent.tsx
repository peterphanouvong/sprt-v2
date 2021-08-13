import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import { useDeleteEventMutation } from "../generated/graphql";

interface Props {
  eventId: number;
  // removeEvent: (id: any) => void;
}

const DeleteEvent: React.FC<Props> = ({ eventId }) => {
  const [, deleteEvent] = useDeleteEventMutation();

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  return (
    <>
      <MenuItem onClick={() => setIsOpen(true)} icon={<DeleteIcon />}>
        Delete
      </MenuItem>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete event
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={async () => {
                  const success = await deleteEvent({ id: eventId });
                  if (!success) {
                    console.log("event doesn't exist");
                  } else {
                    // removeEvent(eventId);
                    onClose();
                  }
                }}
                ml={2}
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

export { DeleteEvent };
