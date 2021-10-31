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
  Image,
  AspectRatio,
  Spacer,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { CovidInfo } from "../../components/CovidInfo";
import { DynamicEditor } from "../../components/DynamicEditor";
import { JoinQuickEventForm } from "../../components/JoinQuickEventForm";
import { MobileLayout } from "../../components/MobileLayout";
import { QuickEventTables } from "../../components/QuickEventTables";
import { ViewAsAdminModal } from "../../components/ViewAsAdminModal";
import {
  useNewQuickEventSubscription,
  useQuickEventQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { parseRichText } from "../../utils/parseRichText";
import { useIsMobileScreen } from "../../utils/useIsMobileScreen";
import defaultLogo from "../../images/redfox-logo.jpg";
import { QuickEventYoutubeLinkModal } from "../../components/QuickEventYoutubeLinkModal";

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
          size='lg'
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

  const numInWaitlist =
    (queryData.quickEvent?.capacity! -
      (attendees
        ? attendees.length
        : JSON.parse(queryData.quickEvent?.users!).length)) *
    -1;

  console.log(queryData);
  const embeddedLink =
    "http://www.youtube.com/embed/" +
    queryData.quickEvent?.youtubeURL?.split("?v=")[1].split("&ab_channel=")[0];
  console.log(embeddedLink);

  return (
    <Box maxW='1440px' margin='auto' padding={4}>
      <Box padding={"5vw"} position='relative'>
        <AspectRatio ratio={16 / 6}>
          <Image
            src={`https://storage.cloud.google.com/qe_banner_images/banner/qe-${intId}-banner.jpg`}
            fallbackSrc={
              "https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700326382.jpg"
            }
            // border={"1px solid #E2E8F0"}
          />
        </AspectRatio>
        <Image
          src={`https://storage.cloud.google.com/qe_banner_images/logo/qe-${intId}-logo.jpg`}
          position='absolute'
          borderRadius={"50%"}
          width={isMobile ? "15vw" : "10vw"}
          height={isMobile ? "15vw" : "10vw"}
          bottom={isMobile ? "-2vw" : "0"}
          left={"10vw"}
          objectFit='cover'
          fallbackSrc={defaultLogo.src}
          background='white'
          border={"1px solid #E2E8F0"}
        />
      </Box>
      {page === "join" ? (
        <SimpleGrid columns={isMobile ? 1 : 2} spacing={10}>
          <MobileLayout>
            <Head>
              <title>Join {queryData.quickEvent?.title} | sprt</title>
            </Head>
            <Heading as='h1' variant='h1'>
              {queryData.quickEvent?.title}
            </Heading>
            <DynamicEditor
              name='description'
              initialValue={parseRichText(
                queryData.quickEvent?.description || ""
              )}
              readOnly={true}
            />
          </MobileLayout>
          <MobileLayout top={4} position='sticky' height='100vh'>
            <Box textAlign='center' my={6}>
              {queryData.quickEvent?.youtubeURL ? (
                <></>
              ) : (
                <>
                  {queryData.quickEvent?.capacity ? (
                    <>
                      {spotsLeft !== 0 ? (
                        <>
                          <Heading variant='h3'>{spotsLeft}</Heading>
                          <Text variant='body-3'>spot(s) left</Text>
                        </>
                      ) : (
                        <>
                          <Heading variant='h3'>{numInWaitlist}</Heading>
                          {numInWaitlist === 1 ? (
                            <Text variant='body-3'>person on the waitlist</Text>
                          ) : (
                            <Text variant='body-3'>people on the waitlist</Text>
                          )}
                          {/* <Text variant='body-3'>people on the waitlist</Text> */}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Heading>
                        {attendees
                          ? attendees.length
                          : JSON.parse(queryData.quickEvent?.users as string)
                              .length}
                      </Heading>
                      <Text variant='body-3'>person(s) are going</Text>
                    </>
                  )}
                </>
              )}
            </Box>

            <Flex
              flexDir={isMobile ? "column" : "row"}
              alignItems='flex-start'
              mt={4}
            >
              <Button
                size={isMobile ? "xs" : "sm"}
                colorScheme='gray'
                variant='outline'
                rightIcon={<CopyIcon />}
                mr={isMobile ? 0 : 2}
                mb={isMobile ? 1 : 0}
                onClick={copyURLToClipboard}
              >
                Copy link to this event
              </Button>
              <Button
                colorScheme='gray'
                variant='outline'
                rightIcon={<ChevronRightIcon />}
                size={isMobile ? "xs" : "sm"}
                onClick={() => setPage("attendees")}
              >
                {queryData.quickEvent?.youtubeURL
                  ? "See who went"
                  : "See who's going"}
                {/* See who's going */}
              </Button>
            </Flex>

            {spotsLeft === 0 ? (
              <Heading mt={6} as='h4' variant='h4'>
                Join waitlist
              </Heading>
            ) : (
              <Heading mt={6} as='h4' variant='h4'>
                {queryData.quickEvent?.youtubeURL
                  ? "Event has ended"
                  : "Join event"}
                {/* Join event */}
              </Heading>
            )}

            {queryData.quickEvent?.youtubeURL ? (
              <Box mt={4}>
                <iframe
                  width='100%'
                  height='261'
                  // aspect-ratio='16 / 9'
                  src={embeddedLink}
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </Box>
            ) : (
              <JoinQuickEventForm
                quickEventId={intId}
                isFull={spotsLeft === 0}
              />
            )}

            {loggedIn ? (
              <Flex mt={4}>
                <Text mt={4} variant='body-2' color='blue.500'>
                  Viewing as Admin
                </Text>
                <Spacer />
                <QuickEventYoutubeLinkModal
                  eventId={intId}
                  youtubeLinkInitial={
                    queryData.quickEvent?.youtubeURL as string
                  }
                />
              </Flex>
            ) : (
              <ViewAsAdminModal setLoggedIn={setLoggedIn} />
            )}

            <CovidInfo />
          </MobileLayout>
        </SimpleGrid>
      ) : (
        <Box maxW='1440px' margin='auto' padding={"5vw"}>
          <IconButton
            icon={<ChevronLeftIcon />}
            aria-label='back'
            borderRadius='full'
            colorScheme='gray'
            onClick={() => setPage("join")}
            variant='outline'
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
                colorScheme='gray'
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
              <Text mt={4} variant='body-2' color='blue.500'>
                Viewing as Admin
              </Text>
            </div>
          ) : (
            <ViewAsAdminModal setLoggedIn={setLoggedIn} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(JoinQuickEvent);
