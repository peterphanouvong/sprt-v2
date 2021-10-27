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
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { CovidInfo } from "../../components/CovidInfo";
import { BaseDynamicEditor } from "../../components/BaseDynamicEditor";
import { QuickEventJoinForm } from "../../components/QuickEventJoinForm";
import { QuickEventTables } from "../../components/QuickEventTables";
import { ViewAsAdminModal } from "../../components/ViewAsAdminModal";
import {
  useNewQuickEventSubscription,
  useQuickEventQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { parseRichText } from "../../utils/parseRichText";
import { useIsMobileScreen } from "../../utils/useIsMobileScreen";
import { BaseWrapper } from "../../components/BaseWrapper";

const JoinQuickEvent = () => {
  const [page, setPage] = useState<"join" | "attendees">("join");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

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

  if (!queryData)
    return (
      <>
        <Spinner
          size="lg"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            marginTop: "5%",
          }}
        />
      </>
    );
  const spotsLeft = Math.max(
    queryData.quickEvent?.capacity! -
      (attendees
        ? attendees.length
        : JSON.parse(queryData.quickEvent?.users!).length),
    0
  );

  return (
    <Box maxW="1440px" margin="auto" padding={4}>
      {page === "join" ? (
        <SimpleGrid columns={isMobile ? 1 : 2} spacing={10}>
          <BaseWrapper>
            <Head>
              <title>Join {queryData.quickEvent?.title} | sprt</title>
            </Head>
            <Heading as="h1" variant="h1">
              {queryData.quickEvent?.title}
            </Heading>
            <BaseDynamicEditor
              name="description"
              initialValue={parseRichText(
                queryData.quickEvent?.description || ""
              )}
              readOnly={true}
            />
          </BaseWrapper>
          <BaseWrapper top={4} position="sticky" height="100vh">
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
                      : JSON.parse(queryData.quickEvent?.users as string)
                          .length}
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

            <QuickEventJoinForm quickEventId={intId} isFull={spotsLeft === 0} />
            {loggedIn ? (
              <div>
                <Text mt={4} variant="body-2" color="blue.500">
                  Viewing as Admin
                </Text>
              </div>
            ) : (
              <ViewAsAdminModal setLoggedIn={setLoggedIn} />
            )}

            <CovidInfo />
          </BaseWrapper>
        </SimpleGrid>
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

          {loggedIn && (
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
          )}

          <QuickEventTables
            isAdmin={loggedIn}
            attendees={attendees}
            queryData={queryData}
            quickEventId={intId}
          />

          {loggedIn ? (
            <div>
              <Text mt={4} variant="body-2" color="blue.500">
                Viewing as Admin
              </Text>
            </div>
          ) : (
            <ViewAsAdminModal setLoggedIn={setLoggedIn} />
          )}
        </>
      )}
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(JoinQuickEvent);
