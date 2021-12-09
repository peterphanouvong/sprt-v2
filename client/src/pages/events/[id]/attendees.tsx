import {
  Box,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Spacer,
  Spinner,
  Switch,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BaseBreadcrumbs } from "../../../components/BaseBreadcrumbs";
import { BaseContent } from "../../../components/BaseContent";
import { BaseLayout } from "../../../components/BaseLayout";
import { BasePageHeader } from "../../../components/BasePageHeader";
import { BaseSection } from "../../../components/BaseSection";
import { EventAttendeeTable } from "../../../components/EventAttendeeTable";
import { EventAttendeeTableAdminView } from "../../../components/EventAttendeeTableAdminView";
import { EventPageOverview } from "../../../components/EventPageOverview";
import { EventPageSideNav } from "../../../components/EventPageSideNav";
import {
  Event,
  useEventAttendeesSubscription,
  useEventAttendeesTriggerMutation,
  useEventQuery,
  useMeQuery,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useIsAuth } from "../../../utils/useIsAuth";
import { useIsMobileScreen } from "../../../utils/useIsMobileScreen";

interface Props {}

const EventAttendees: React.FC<Props> = ({}) => {
  useIsAuth();

  const isMobile = useIsMobileScreen();

  const router = useRouter();
  const { id } = router.query;
  const [isViewAdmin, setIsViewAdmin] = React.useState<boolean>(false);

  const [{ data: me }] = useMeQuery();

  const [{ data, fetching }] = useEventQuery({
    pause: id === undefined,
    variables: {
      id: id as string,
    },
  });

  const [{ data: attendeeData }] = useEventAttendeesSubscription({
    pause: id === undefined,
    variables: {
      id: parseInt(id as string),
    },
  });

  const [, trigger] = useEventAttendeesTriggerMutation();

  console.log("attendeeData", attendeeData);

  useEffect(() => {
    if (id) {
      console.log("trigger");
      trigger({ id: parseInt(id as string) });
    }
  }, [id]);

  if (fetching) {
    return <Spinner />;
  }

  if (!fetching && (!data || !attendeeData)) {
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
              <Box>
                <HStack alignItems="center">
                  <Heading as="h6" variant="h6"></Heading>
                  <Spacer />
                  {data?.event.owner.id === me?.me?.id && (
                    <>
                      <FormLabel htmlFor="admin-toggle">
                        <Text variant="body-3">View as admin</Text>
                      </FormLabel>
                      <Switch
                        id="admin-toggle"
                        size="md"
                        onChange={() => setIsViewAdmin(!isViewAdmin)}
                      />
                    </>
                  )}
                </HStack>
                {isViewAdmin ? (
                  <EventAttendeeTableAdminView
                    eventAttendees={attendeeData!.eventAttendees}
                    eventId={data?.event.id as number}
                  />
                ) : (
                  <EventAttendeeTable
                    eventAttendees={attendeeData!.eventAttendees}
                  />
                )}
              </Box>
            </BaseSection>
          </>
        ) : (
          <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
            <EventPageSideNav id={id as string} />
            <BaseSection title="Attendees">
              <Box>
                <HStack alignItems="center">
                  <Heading as="h6" variant="h6"></Heading>
                  <Spacer />
                  {data?.event.owner.id === me?.me?.id && (
                    <>
                      <FormLabel htmlFor="admin-toggle">
                        <Text variant="body-3">View as admin</Text>
                      </FormLabel>
                      <Switch
                        id="admin-toggle"
                        size="md"
                        onChange={() => setIsViewAdmin(!isViewAdmin)}
                      />
                    </>
                  )}
                </HStack>
                {isViewAdmin ? (
                  <EventAttendeeTableAdminView
                    eventAttendees={attendeeData!.eventAttendees}
                    eventId={data?.event.id as number}
                  />
                ) : (
                  <EventAttendeeTable
                    eventAttendees={attendeeData!.eventAttendees}
                  />
                )}
              </Box>
            </BaseSection>
          </Grid>
        )}
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EventAttendees);
