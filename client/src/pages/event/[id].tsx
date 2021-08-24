import React from "react";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import {
  Event as EventType,
  useAddAttendeeMutation,
  useEventQuery,
  useMeQuery,
  User,
} from "../../generated/graphql";
import { Card } from "../../components/Card";
// import { RenderPrettyJSON } from "../../utils/renderPrettyJSON";
import { CSVLink } from "react-csv";
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Link,
  MenuItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import { DownloadIcon, WarningIcon } from "@chakra-ui/icons";
import { ClubIcon } from "../../components/ClubIcon";
import { EventDeleteButton } from "../../components/EventDeleteButton";
import { EventEditButton } from "../../components/EventEditButton";
import { OptionsButton } from "../../components/OptionsButton";
import { ViewAttendeesModalButton } from "../../components/ViewAttendeesModalButton";
import { parseDatePretty } from "../../utils/parseDate";
// import NextLink from "next/link";
import { DynamicEditor } from "../../components/DynamicEditor";
import { parseRichText } from "../../utils/parseRichText";
import { RenderPrettyJSON } from "../../utils/renderPrettyJSON";

const Event = () => {
  const router = useRouter();
  const toast = useToast();
  const [, addAttendee] = useAddAttendeeMutation();

  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching, error }] = useEventQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  const [{ data: meData }] = useMeQuery();

  if (fetching) return <>loading..</>;
  if (error) return <Layout>{error.message}</Layout>;
  if (!data?.event || !meData?.me)
    return <Layout>couldn't find the event</Layout>;

  const joinEvent = async () => {
    const { error } = await addAttendee({ eventId: data.event!.id });

    if (!error) {
      // router.reload();
      toast({
        title: "Joined event",
        variant: "subtle",
        description: `We've added you as an attendee to "${data.event?.title}"`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      // router.reload();
    } else if (error) {
      toast({
        title: "Error",
        variant: "subtle",
        position: "top",
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Box>
          <Box>
            <HStack mb={2}>
              <ClubIcon />
              <Box>
                <Text variant="label" fontWeight="semibold">
                  {data.event.host.username}
                  <Text fontWeight="normal" display="inline">
                    {" "}
                    is hosting
                  </Text>
                </Text>
              </Box>
            </HStack>

            <Box display="flex">
              <Heading variant="h2" as="h2">
                {data.event.title}
              </Heading>
              <Button ml={6} colorScheme="orange" variant="outline">
                Join
              </Button>
            </Box>

            <Text variant="label">
              {parseDatePretty(data.event.startTime)} [{data.event.location}]
            </Text>
          </Box>
        </Box>
        <Box textAlign="right">
          <OptionsButton>
            {meData.me?.id === data.event.host.id ? (
              <>
                <EventEditButton event={data.event as EventType} />
                <EventDeleteButton eventId={data.event.id} />
                <MenuItem icon={<DownloadIcon />}>
                  <CSVLink
                    data={data.event.attendees.map((x) => ({
                      id: x.id,
                      Username: x.username,
                      Firtname: x.firstname,
                      Lastname: x.lastname,
                    }))}
                    filename={`${data.event.title}-attendees.csv`}
                  >
                    Export attendees
                  </CSVLink>
                </MenuItem>
              </>
            ) : (
              <MenuItem icon={<WarningIcon />}>Report</MenuItem>
            )}
          </OptionsButton>
          <ViewAttendeesModalButton
            capacity={data.event.capacity}
            attendees={data.event.attendees as User[]}
            joinEvent={joinEvent}
          />
        </Box>
      </Box>

      <Divider mb={2} />

      <DynamicEditor
        name="description"
        initialValue={parseRichText(data.event.description)}
        readOnly={true}
      />

      <Divider mb={2} />
      <RenderPrettyJSON object={data} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Event);
