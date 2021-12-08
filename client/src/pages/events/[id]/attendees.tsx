import { Grid, Spinner } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { BaseContent } from "../../../components/BaseContent";
import { BaseLayout } from "../../../components/BaseLayout";
import { BasePageHeader } from "../../../components/BasePageHeader";
import { BaseSection } from "../../../components/BaseSection";
import { EventAttendeeTable } from "../../../components/EventAttendeeTable";
import { EventPageOverview } from "../../../components/EventPageOverview";
import { EventPageSideNav } from "../../../components/EventPageSideNav";
import {
  Attendee,
  useEventAttendeesSubscription,
  useEventQuery,
  useMeQuery,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useIsAuth } from "../../../utils/useIsAuth";
import { Event } from "../../../generated/graphql";
import { useIsMobileScreen } from "../../../utils/useIsMobileScreen";
import { BaseBreadcrumbs } from "../../../components/BaseBreadcrumbs";

interface Props {}

const EventAttendees: React.FC<Props> = ({}) => {
  useIsAuth();

  const isMobile = useIsMobileScreen();

  const router = useRouter();
  const { id } = router.query;

  const [{ data: me }] = useMeQuery();
  console.log(me);

  const [{ data, fetching }] = useEventQuery({
    pause: id === undefined,
    variables: {
      id: id as string,
    },
  });

  const [{ data: attendees }] = useEventAttendeesSubscription({
    pause: id === undefined,
    variables: {
      id: parseInt(id as string),
    },
  });

  console.log("data-event", data?.event);

  if (fetching) {
    return <Spinner />;
  }

  if (!fetching && !data) {
    return <>no data </>;
  }

  return (
    <BaseLayout>
      <Head>
        <title>EventAttendees | sprt</title>
      </Head>
      <BasePageHeader>{data?.event.title}</BasePageHeader>
      <EventPageOverview event={data?.event as Event} />

      <BaseContent flex={1}>
        {isMobile ? (
          <>
            <BaseBreadcrumbs
              crumbs={[
                { href: `/events/${id}`, title: "Description" },
                { href: `/events/${id}/join`, title: "Join event" },
                { href: `/events/${id}/attendees`, title: "See who's going" },
              ]}
            />

            <BaseSection title="Attendees">
              <EventAttendeeTable
                attendees={
                  (attendees?.eventAttendees as Attendee[]) ||
                  //@ts-ignore
                  data?.event.attendees
                }
              />
            </BaseSection>
          </>
        ) : (
          <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
            <EventPageSideNav id={id as string} />
            <BaseSection title="Attendees">
              <EventAttendeeTable
                attendees={
                  (attendees?.eventAttendees as Attendee[]) ||
                  //@ts-ignore
                  data?.event.attendees
                }
              />
            </BaseSection>
          </Grid>
        )}
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EventAttendees);
