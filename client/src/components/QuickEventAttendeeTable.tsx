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
  keyframes,
} from "@chakra-ui/react";
import React from "react";
import { format } from "date-fns";
import { CheckIcon, CloseIcon, MinusIcon } from "@chakra-ui/icons";

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

  const animate = keyframes`
    0% { background-position: 0 0 }
	  100% { background-position: -500px 0 }
  `;

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
                  <Th>Paying Cash</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {users.map(
              (
                user: {
                  email: string;
                  firstName: string;
                  lastName: string;
                  beemId: string;
                  createdAt: string;
                  status: string;
                  isPayingCash: boolean;
                },
                idx
              ) => {
                return (
                  <Tr key={user.email}>
                    <Td>{idx + 1}</Td>
                    {user.email === "0401379827" ||
                    user.email === "0450769340" ||
                    user.email === "0450769343" ? (
                      <>
                        <Td
                          backgroundImage={
                            "-webkit-linear-gradient(left, #f00, #ff2b00, #f50, #ff8000, #fa0, #ffd500, #ff0, #d4ff00, #af0, #80ff00, #5f0, #2bff00, #0f0, #00ff2a, #0f5, #00ff80, #0fa, #00ffd5, #0ff, #00d5ff, #0af, #0080ff, #05f, #002aff, #00f, #2b00ff, #50f, #8000ff, #a0f, #d400ff, #f0f, #ff00d4, #f0a, #ff0080, #f05, #ff002b, #f00)"
                          }
                          backgroundClip={"text"}
                          textFillColor={"#0000"}
                          animation={`${animate} 5s linear infinite alternate`}
                          fontWeight='bold'
                        >
                          {user.firstName}
                        </Td>
                        <Td
                          backgroundImage={
                            "-webkit-linear-gradient(left, #f00, #ff2b00, #f50, #ff8000, #fa0, #ffd500, #ff0, #d4ff00, #af0, #80ff00, #5f0, #2bff00, #0f0, #00ff2a, #0f5, #00ff80, #0fa, #00ffd5, #0ff, #00d5ff, #0af, #0080ff, #05f, #002aff, #00f, #2b00ff, #50f, #8000ff, #a0f, #d400ff, #f0f, #ff00d4, #f0a, #ff0080, #f05, #ff002b, #f00)"
                          }
                          backgroundClip={"text"}
                          textFillColor={"#0000"}
                          animation={`${animate} 5s linear infinite alternate`}
                          fontWeight='bold'
                        >
                          {user.lastName}
                        </Td>
                      </>
                    ) : (
                      <>
                        <Td>{user.firstName}</Td>
                        <Td>{user.lastName}</Td>
                      </>
                    )}

                    <Td>
                      {format(Date.parse(user.createdAt), "K:mmaaa dd/MM")}
                    </Td>
                    {isAdmin && (
                      <>
                        <Td>{user.email}</Td>
                        <Td textAlign='center'>
                          {user.beemId === "" ? <MinusIcon /> : user.beemId}
                        </Td>
                        <Td textAlign='center'>
                          {user.isPayingCash ? <CheckIcon /> : <CloseIcon />}
                        </Td>
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
                                removeFromWaitlistAlert(user);
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

export { QuickEventAttendeeTable };
