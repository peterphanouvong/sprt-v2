import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { format } from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

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
  onDragEnd: (any) => void;
}

const QuickEventAttendeeTableAdminView: React.FC<Props> = ({
  users,
  isAdmin = false,
  isWaitlist = false,
  setConfirmedAttendees,
  confirmedAttendees,
  confirmAttendee,
  removeAttendee,
  removeWaitlistAttendee,
  onDragEnd,
}) => {
  const [isAlertOpen, setisAlertOpen] = React.useState(false);
  const onClose = () => setisAlertOpen(false);
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const [isSortDescending, setSortDescending] = React.useState<boolean | null>(
    null
  );

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

  const toggleSortDirection = () => {
    setSortDescending(!isSortDescending);
    console.log(users);
    let sorted = users;
    if (isSortDescending) {
      sorted = users.sort(
        (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
      );
    } else {
      sorted = users.sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      );
    }
    console.log(sorted);
    // setSortOrder(sorted);
  };

  return users.length == 0 ? (
    <>nothing here...</>
  ) : (
    <>
      <DragDropContext
        onDragEnd={(result) => {
          onDragEnd(result);
          setSortDescending(null);
        }}
      >
        <Droppable droppableId='droppable'>
          {(provided) => (
            <Box
              overflowX='auto'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Table>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>First</Th>
                    <Th>Last</Th>
                    <Th>
                      Joined{" "}
                      <IconButton
                        onClick={toggleSortDirection}
                        variant='ghost'
                        aria-label={
                          isSortDescending
                            ? "Sort descending"
                            : "Sort ascending"
                        }
                        icon={
                          isSortDescending ? (
                            <ChevronDownIcon />
                          ) : (
                            <ChevronUpIcon />
                          )
                        }
                      />
                    </Th>
                    {isAdmin && (
                      <>
                        <Th>Phone</Th>
                        <Th>BeemID</Th>
                        <Th>Status </Th>
                        <Th></Th>
                      </>
                    )}
                  </Tr>
                </Thead>
                <Tbody>
                  {users
                    .sort((a, b) => {
                      if (isSortDescending === null) {
                        return 0;
                      } else if (isSortDescending) {
                        return (
                          Date.parse(a.createdAt) - Date.parse(b.createdAt)
                        );
                      } else {
                        return (
                          Date.parse(b.createdAt) - Date.parse(a.createdAt)
                        );
                      }
                    })
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
                          <Draggable
                            key={user.email}
                            draggableId={user.email}
                            index={idx}
                          >
                            {(provided) => (
                              <Tr
                                key={user.email}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Td>{idx + 1}</Td>
                                <Td>{user.firstName}</Td>
                                <Td>{user.lastName}</Td>
                                <Td>
                                  {format(
                                    Date.parse(user.createdAt),
                                    "K:mmaaa dd/MM"
                                  )}
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
                            )}
                          </Draggable>
                        );
                      }
                    )}
                  {provided.placeholder}
                </Tbody>
              </Table>
            </Box>
          )}
        </Droppable>
      </DragDropContext>

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
                onClick={() => {
                  removeWaitlistAttendee(removedUser?.email);
                  onClose();
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

export { QuickEventAttendeeTableAdminView };
