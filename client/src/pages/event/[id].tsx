import React from "react";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { useEventQuery, User } from "../../generated/graphql";
import { Box, Divider, Skeleton, SkeletonText } from "@chakra-ui/react";
import { ViewAttendeesModalButton } from "../../components/ViewAttendeesModalButton";
import { DynamicEditor } from "../../components/DynamicEditor";
import { parseRichText } from "../../utils/parseRichText";
import { EventOptionsButton } from "../../components/EventOptionsButton";
import { EventJoinButton } from "../../components/EventJoinButton";
import { EventHeader } from "../../components/EventHeader";

const Event = () => {
  const router = useRouter();
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
    <Layout>
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
            <Skeleton height="70px" width="100px" />
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
      {!data?.event ? (
        <Skeleton width="111px" height="40px" mb={4}></Skeleton>
      ) : (
        <Skeleton isLoaded={!fetching}>
          <EventJoinButton
            mb={4}
            eventId={data.event.id}
            eventTitle={data.event.title}
          />
        </Skeleton>
      )}

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
