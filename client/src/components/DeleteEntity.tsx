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
import { useMeQuery } from "../generated/graphql";

interface Props {
  handleDelete: () => Promise<string | null>;
  entityName: string;
  // admins: Array<User>;
}

const DeleteEntity: React.FC<Props> = ({
  handleDelete,
  entityName,
  // admins,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  // const [adminUsernames, setAdminUsernames] = React.useState(
  //   admins.map((admin) => admin.username)
  // );
  const [deleteError, setDeleteError] = React.useState<string | null>(null);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const [{ data }] = useMeQuery();

  return (
    <>
      <MenuItem
        // isDisabled={!(data && adminUsernames.includes(data.me?.username))}
        onClick={() => {
          setIsOpen(true);
          // console.log(data);
        }}
        icon={<DeleteIcon />}
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
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {entityName}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
              {deleteError && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle mr={2}>Error</AlertTitle>
                  <AlertDescription>{deleteError}</AlertDescription>
                  <CloseButton
                    position="absolute"
                    right="8px"
                    top="8px"
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
                colorScheme="red"
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
