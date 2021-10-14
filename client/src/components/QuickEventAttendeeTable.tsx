import { Box } from "@chakra-ui/layout";
import { Table, Thead, Tr, Th, Tbody, Td, Button } from "@chakra-ui/react";
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
}

const QuickEventAttendeeTable: React.FC<Props> = ({
  users,
  isAdmin = false,
  isWaitlist = false,
  setConfirmedAttendees,
  confirmedAttendees,
  confirmAttendee,
  removeAttendee,
}) => {
  return users.length == 0 ? (
    <>nothing here...</>
  ) : (
    <Box overflowX="auto">
      <Table>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>First</Th>
            <Th>Last</Th>
            <Th>Joined</Th>
            {isAdmin && (
              <>
                <Th>Email</Th>
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
                              colorScheme="green"
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
                          </Td>
                        )}

                        {!isWaitlist && (
                          <Td>
                            <Button
                              colorScheme="red"
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
  );
};

export { QuickEventAttendeeTable };
