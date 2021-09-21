import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  DownloadIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { CSVLink } from "react-csv";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { JoinQuickEventForm } from "../../components/JoinQuickEventForm";
import { MobileLayout } from "../../components/MobileLayout";
import {
  useNewQuickEventSubscription,
  useQuickEventQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsMobileScreen } from "../../utils/useIsMobileScreen";
import { format } from "date-fns";

const JoinQuickEvent = () => {
  const [page, setPage] = useState<"join" | "attendees">("join");

  const router = useRouter();
  const toast = useToast();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const isMobile = useIsMobileScreen();

  const [{ data: queryData }] = useQuickEventQuery({
    pause: intId === -1,
    variables: {
      quickEventId: intId,
    },
  });

  const getAttendees = (_, result) => {
    console.log(result);
    return JSON.parse(result.newQuickEvent.users);
    // return result;
  };

  const [{ data: attendees }] = useNewQuickEventSubscription(
    {
      pause: intId === -1,
      variables: {
        newQuickEventId: intId,
      },
    },
    getAttendees
  );

  const copyURLToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);

    toast({
      description: "URL copied to clipboard",
      isClosable: true,
      status: "info",
      variant: "subtle",
      position: "top",
    });
  };

  if (!queryData) return <>popp</>;
  const spotsLeft = Math.max(
    queryData.quickEvent?.capacity! -
      (attendees
        ? attendees.length
        : JSON.parse(queryData.quickEvent?.users!).length),
    0
  );

  return (
    <MobileLayout>
      {page === "join" ? (
        <>
          <Head>
            <title>Join {queryData.quickEvent?.title} | sprt</title>
          </Head>
          <Heading as="h1" variant="h1">
            {queryData.quickEvent?.title}
          </Heading>
          <Text>{queryData.quickEvent?.description}</Text>

          <Box textAlign="center" my={6}>
            {queryData.quickEvent?.capacity ? (
              <>
                <Heading variant="h3">{spotsLeft}</Heading>
                <Text variant="body-3">spot(s) left</Text>
              </>
            ) : (
              <>
                <Heading>
                  {attendees
                    ? attendees.length
                    : JSON.parse(queryData.quickEvent?.users as string).length}
                </Heading>
                <Text variant="body-3">person(s) are going</Text>
              </>
            )}
          </Box>

          <Flex
            flexDir={isMobile ? "column" : "row"}
            alignItems="flex-start"
            mt={4}
          >
            <Button
              size={isMobile ? "xs" : "sm"}
              colorScheme="gray"
              variant="outline"
              rightIcon={<CopyIcon />}
              mr={isMobile ? 0 : 2}
              mb={isMobile ? 1 : 0}
              onClick={copyURLToClipboard}
            >
              Copy link to this event
            </Button>
            <Button
              colorScheme="gray"
              variant="outline"
              rightIcon={<ChevronRightIcon />}
              size={isMobile ? "xs" : "sm"}
              onClick={() => setPage("attendees")}
            >
              See who's going
            </Button>
          </Flex>

          <Heading mt={6} as="h4" variant="h4">
            Join event
          </Heading>

          <JoinQuickEventForm quickEventId={intId} isFull={spotsLeft === 0} />
        </>
      ) : (
        <>
          <IconButton
            icon={<ChevronLeftIcon />}
            aria-label="back"
            borderRadius="full"
            colorScheme="gray"
            onClick={() => setPage("join")}
            variant="outline"
          />
          <Heading mt={4} as="h3" variant="h3">
            Attendees
          </Heading>

          <CSVLink
            filename={`${queryData.quickEvent?.title.replaceAll(
              " ",
              "_"
            )}_attendees`}
            data={JSON.parse(queryData.quickEvent?.users as string)}
          >
            <Button
              size={isMobile ? "xs" : "sm"}
              my={4}
              colorScheme="gray"
              rightIcon={<DownloadIcon />}
            >
              Download list of attendees
            </Button>
          </CSVLink>

          <Box overflowX="auto">
            <Table>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>First</Th>
                  <Th>Last</Th>
                  <Th>Email</Th>
                  <Th>Joined</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(
                  attendees || JSON.parse(queryData.quickEvent?.users as string)
                )
                  .sort(
                    (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
                  )
                  .map(
                    (
                      user: {
                        email: string;
                        firstName: string;
                        lastName: string;
                        createdAt: string;
                      },
                      idx
                    ) => {
                      return (
                        <>
                          {idx === queryData.quickEvent?.capacity && (
                            <Tr>
                              <Th>Waitlist</Th>
                              <Th></Th>
                              <Th></Th>
                              <Th></Th>
                              <Th></Th>
                            </Tr>
                          )}
                          <Tr key={user.email}>
                            <Td>
                              {idx >= queryData.quickEvent?.capacity!
                                ? queryData.quickEvent?.capacity! - idx + 1
                                : idx + 1}
                            </Td>
                            <Td>{user.firstName}</Td>
                            <Td>{user.lastName}</Td>
                            <Td>{user.email}</Td>
                            <Td>
                              {format(
                                Date.parse(user.createdAt),
                                "K:mmaaa dd/MM"
                              )}
                            </Td>
                          </Tr>
                        </>
                      );
                    }
                  )}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
    </MobileLayout>
  );
};

export default withUrqlClient(createUrqlClient)(JoinQuickEvent);
