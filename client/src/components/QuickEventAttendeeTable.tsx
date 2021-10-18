import { Box } from "@chakra-ui/layout";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React from "react";
import { format } from "date-fns";

interface Props {
  users: any;
  isAdmin?: boolean;
  isWaitlist?: boolean;
  setConfirmedAttendees: (any) => void;
  confirmedAttendees: any;
  quickEventId: number;
  confirmAttendee: (string) => void;
  removeAttendee: (string) => void;
  removeWaitlistAttendee: (string) => void;
}

const QuickEventAttendeeTable: React.FC<Props> = ({
  users,
  isAdmin = false,
  isWaitlist = false,
  setConfirmedAttendees,
  confirmedAttendees,
  confirmAttendee,
  removeAttendee,
  removeWaitlistAttendee,
}) => {
  const [isAlertOpen, setisAlertOpen] = React.useState(false);
  const onClose = () => setisAlertOpen(false);
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const [removedUser, setRemovedUser] = React.useState<{
    email: string;
    firstName: string;
    lastName: string;
    beemId: string;
    createdAt: string;
    status: string;
  }>();

  const removeFromWaitlistAlert = (user: {
    email: string;
    firstName: string;
    lastName: string;
    beemId: string;
    createdAt: string;
    status: string;
  }) => {
    setisAlertOpen(true);
    setRemovedUser(user);
  };

  return users.length == 0 ? (
    <>nothing here...</>
  ) : (
    <>
      <Box overflowX='auto'>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>First</Th>
              <Th>Last</Th>
              <Th>Joined</Th>
              {isAdmin && (
                <>
                  <Th>Phone</Th>
                  <Th>BeemID</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {users
              .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
              .map(
                (
                  user: {
                    email: string;
                    firstName: string;
                    lastName: string;
                    beemId: string;
                    createdAt: string;
                    status: string;
                  },
                  idx
                ) => {
                  return (
                    <Tr key={user.email}>
                      <Td>{idx + 1}</Td>
                      <Td>{user.firstName}</Td>
                      <Td>{user.lastName}</Td>
                      <Td>
                        {format(Date.parse(user.createdAt), "K:mmaaa dd/MM")}
                      </Td>
                      {isAdmin && (
                        <>
                          <Td>{user.email}</Td>
                          <Td>{user.beemId}</Td>
                          <Td>{user.status}</Td>
                          {isWaitlist && (
                            <Td>
                              <Button
                                colorScheme='green'
                                onClick={() => {
                                  confirmAttendee(user.email);
                                  setConfirmedAttendees({
                                    ...confirmedAttendees,
                                    [user.email]: true,
                                  });
                                }}
                              >
                                Confirm
                              </Button>
                              <Button
                                ml={4}
                                colorScheme='red'
                                onClick={() => {
                                  // console.log("test");
                                  // removeWaitlistAttendee(user.email);
                                  removeFromWaitlistAlert(user);
                                  // removeAttendee(user.email);
                                }}
                              >
                                Remove
                              </Button>
                            </Td>
                          )}

                          {!isWaitlist && (
                            <Td>
                              <Button
                                colorScheme='red'
                                onClick={() => {
                                  removeAttendee(user.email);
                                  setConfirmedAttendees({
                                    ...confirmedAttendees,
                                    [user.email]: false,
                                  });
                                }}
                              >
                                Remove
                              </Button>
                            </Td>
                          )}
                        </>
                      )}
                    </Tr>
                  );
                }
              )}
          </Tbody>
        </Table>
      </Box>
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Removing {removedUser?.firstName + " " + removedUser?.lastName}{" "}
              from waitlist
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? {removedUser?.firstName} will have to join the
              waitlist queue again.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button variant='ghost' color='black' onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={async () => {
                  await removeWaitlistAttendee(removedUser?.email);
                  onclose;
                }}
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

export { QuickEventAttendeeTable };
