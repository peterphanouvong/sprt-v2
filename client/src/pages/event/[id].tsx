import { DownloadIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  HStack,
  IconButton,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { CSVLink } from "react-csv";
import { DynamicEditor } from "../../components/DynamicEditor";
import { EventHeader } from "../../components/EventHeader";
import { EventJoinButton } from "../../components/EventJoinButton";
import { EventJoinedStat } from "../../components/EventJoinedStat";
import { EventOptionsButton } from "../../components/EventOptionsButton";
import { Layout } from "../../components/Layout";
import { ViewAttendeesModalButton } from "../../components/ViewAttendeesModalButton";
import {
  useEventQuery,
  User,
  Event as EventType,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { parseRichText } from "../../utils/parseRichText";
import { useIsMobileScreen } from "../../utils/useIsMobileScreen";

const Event = () => {
  const router = useRouter();
  const isMobile = useIsMobileScreen();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching, error }] = useEventQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (error) return <Layout>{error.message}</Layout>;

  return (
    <Layout title={data?.event?.title}>
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <EventHeader eventId={intId} />
        <Box textAlign="right">
          <EventOptionsButton eventId={intId} />
          {!data?.event ? (
            <Skeleton>
              <EventJoinedStat capacity={10} attendees={[]} onOpen={() => {}} />
            </Skeleton>
          ) : (
            <Skeleton isLoaded={!!data?.event}>
              <ViewAttendeesModalButton
                capacity={data.event.capacity}
                attendees={data.event.attendees as User[]}
                eventId={data?.event?.id}
                eventTitle={data?.event?.title}
              />
            </Skeleton>
          )}
        </Box>
      </Box>

      <HStack mb={4}>
        {!data?.event ? (
          <Skeleton width="111px" height="40px"></Skeleton>
        ) : (
          <Skeleton isLoaded={!fetching}>
            <EventJoinButton
              event={data.event as EventType}
              attendees={data.event.attendees as User[]}
              eventId={data.event.id}
              eventTitle={data.event.title}
            />
          </Skeleton>
        )}

        {!data?.event ? (
          <Skeleton width="111px" height="40px" />
        ) : (
          <Skeleton isLoaded={!!data?.event}>
            <ViewAttendeesModalButton
              as="button"
              buttonSize={isMobile ? "sm" : "md"}
              capacity={data.event.capacity}
              attendees={data.event.attendees as User[]}
              eventId={data?.event?.id}
              eventTitle={data?.event?.title}
            />
          </Skeleton>
        )}

        {!data?.event ? (
          <Skeleton width="111px" height="40px"></Skeleton>
        ) : (
          <Skeleton isLoaded={!fetching}>
            <CSVLink
              data={data.event.attendees.map((x) => ({
                "First name": x.firstname,
                "Last name": x.lastname,
              }))}
            >
              <IconButton
                size={isMobile ? "sm" : "md"}
                aria-label="export attendees"
                variant="outline"
                icon={<DownloadIcon />}
              />
            </CSVLink>
          </Skeleton>
        )}
      </HStack>
      {!data?.event ? (
        <Skeleton height="40px"></Skeleton>
      ) : (
        <Skeleton isLoaded={!fetching}>
          <EventJoinButton
            width="full"
            event={data.event as EventType}
            eventId={data.event.id}
            eventTitle={data.event.title}
            attendees={data.event.attendees as User[]}
          />
        </Skeleton>
      )}

      <Divider my={2} />
      {!data?.event ? (
        <SkeletonText my="4" noOfLines={4} spacing="4" />
      ) : (
        <Skeleton isLoaded={!fetching}>
          <DynamicEditor
            name="description"
            initialValue={parseRichText(data.event.description)}
            readOnly={true}
          />
        </Skeleton>
      )}

      <Divider mb={2} />
      {/* <RenderPrettyJSON object={data} /> */}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Event);
