import React from "react";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { useEventQuery, User } from "../../generated/graphql";
import {
  Box,
  Divider,
  HStack,
  IconButton,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { ViewAttendeesModalButton } from "../../components/ViewAttendeesModalButton";
import { DynamicEditor } from "../../components/DynamicEditor";
import { parseRichText } from "../../utils/parseRichText";
import { EventOptionsButton } from "../../components/EventOptionsButton";
import { EventJoinButton } from "../../components/EventJoinButton";
import { EventHeader } from "../../components/EventHeader";
import NextLink from "next/link";
import { DownloadIcon } from "@chakra-ui/icons";
import { useIsMobileScreen } from "../../utils/useIsMobileScreen";
import { EventJoinedStat } from "../../components/EventJoinedStat";

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
            <NextLink href={`/event-info/${data.event.id}`}>
              <IconButton
                size={isMobile ? "sm" : "md"}
                aria-label="export attendees"
                variant="outline"
                icon={<DownloadIcon />}
              />
            </NextLink>
          </Skeleton>
        )}
      </HStack>

      <Divider mb={2} />
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
