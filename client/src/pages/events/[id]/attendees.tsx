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
import React from "react";
import { BaseContent } from "../../../components/BaseContent";
import { BaseLayout } from "../../../components/BaseLayout";
import { BasePageHeader } from "../../../components/BasePageHeader";
import { EventAttendeeTable } from "../../../components/EventAttendeeTable";
import { EventAttendeeTableAdminView } from "../../../components/EventAttendeeTableAdminView";
import { EventPageOverview } from "../../../components/EventPageOverview";
import { EventPageSideNav } from "../../../components/EventPageSideNav";
import {
  Attendee,
  Event,
  useEventAttendeesSubscription,
  useEventQuery,
  useMeQuery,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useIsAuth } from "../../../utils/useIsAuth";

interface Props {}

const EventAttendees: React.FC<Props> = ({}) => {
  // useIsAuth();
  const router = useRouter();
  const { id } = router.query;
  const [isViewAdmin, setIsViewAdmin] = React.useState<boolean>(false);

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
        <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
          <EventPageSideNav id={id as string} />
          <Box>
            <HStack alignItems="center">
              <Heading as="h6" variant="h6">
                Attendees
              </Heading>
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
                attendees={
                  (attendees?.eventAttendees as Attendee[]) ||
                  //@ts-ignore
                  data?.event.attendees
                }
              />
            ) : (
              <EventAttendeeTable
                attendees={
                  (attendees?.eventAttendees as Attendee[]) ||
                  //@ts-ignore
                  data?.event.attendees
                }
              />
            )}
          </Box>
        </Grid>
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EventAttendees);
