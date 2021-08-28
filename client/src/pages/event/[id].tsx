import { ButtonGroup, Divider, Skeleton, SkeletonText } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { DynamicEditor } from "../../components/DynamicEditor";
import { EventHeader } from "../../components/EventHeader";
import { EventJoinButton } from "../../components/EventJoinButton";
import { EventMetaInfo } from "../../components/EventMetaInfo";
import { Layout } from "../../components/Layout";
import { ViewAttendeesModalButton } from "../../components/ViewAttendeesModalButton";
import {
  Event as EventType,
  useEventQuery,
  User,
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
      <EventHeader eventId={intId} />

      <ButtonGroup mt={4}>
        {!data?.event ? (
          <Skeleton width="111px" height="40px"></Skeleton>
        ) : (
          <Skeleton isLoaded={!fetching}>
            <EventJoinButton
              size={isMobile ? "xs" : "sm"}
              event={data.event as EventType}
              attendees={data.event.attendees as User[]}
            />
          </Skeleton>
        )}

        {!data?.event ? (
          <Skeleton width="111px" height="40px" />
        ) : (
          <Skeleton isLoaded={!!data?.event}>
            <ViewAttendeesModalButton
              as="button"
              colorScheme="gray"
              variant="outline"
              buttonSize={isMobile ? "sm" : "md"}
              capacity={data.event.capacity}
              attendees={data.event.attendees as User[]}
            />
          </Skeleton>
        )}
      </ButtonGroup>

      <Skeleton isLoaded={!!data?.event}>
        <EventMetaInfo
          mt={2}
          location={data?.event?.location || "location"}
          startTime={data?.event?.startTime || undefined}
          endTime={data?.event?.endTime || undefined}
          capacity={data?.event?.capacity || undefined}
        />
      </Skeleton>

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
