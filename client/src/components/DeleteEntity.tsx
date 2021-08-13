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
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  handleDelete: () => Promise<string | null>;
  entityName: string;
}

const DeleteEntity: React.FC<Props> = ({ handleDelete, entityName }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);
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
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete {entityName}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
              {deleteError && (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertTitle mr={2}>Error</AlertTitle>
                  <AlertDescription>{deleteError}</AlertDescription>
                  <CloseButton
                    position='absolute'
                    right='8px'
                    top='8px'
                    onClick={() => setDeleteError(null)}
                  />
                </Alert>
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={async () => {
                  const fail = await handleDelete();
                  if (!fail) {
                    onClose();
                  } else {
                    // error handling?
                    setDeleteError(fail);
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

export { DeleteEntity };
