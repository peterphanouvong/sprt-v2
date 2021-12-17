import { SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { EventAttendeeTable } from "../../../components/EventAttendeeTable";
import { EventAttendeeTableAdminView } from "../../../components/EventAttendeeTableAdminView";
import { EventDeleteModal } from "../../../components/EventDeleteModal";
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
import { useIsMobileScreen } from "../../../utils/useIsMobileScreen";

interface Props {}

const EventAttendees: React.FC<Props> = ({}) => {
  const isMobile = useIsMobileScreen();

  const router = useRouter();
  const { id } = router.query;
  const [isViewAdmin, setIsViewAdmin] = React.useState<boolean>(true);

  const [{ data: me }] = useMeQuery();

  const [{ data, fetching }] = useEventQuery({
    pause: id === undefined,
    variables: {
      id: id as string,
    },
  });

  const [
    { data: attendeeData, fetching: attendeeFetching },
  ] = useEventAttendeesSubscription({
    pause: id === undefined,
    variables: {
      id: parseInt(id as string),
    },
  });

  const [, trigger] = useEventAttendeesTriggerMutation();

  useEffect(() => {
    if (id) {
      console.log("trigger");
      trigger({ id: parseInt(id as string) });
    }
  }, [id]);

  if (fetching || attendeeFetching) {
    return <Spinner />;
  }

  if (!data || !attendeeData) {
    return <>no data </>;
  }

  return (
    <BaseLayout>
      <Head>
        <title>EventAttendees | sprt</title>
      </Head>
      <BasePageHeader>
        <Flex justify="space-between">
          <div>{data?.event.title}</div>

          {data?.event.owner.id === me?.me?.id && (
            <div>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<SettingsIcon />}
                  variant="ghost"
                  colorScheme="gray"
                  rounded="full"
                />
                <MenuList fontSize="md">
                  <MenuItem>Mark as complete</MenuItem>
                  <EventDeleteModal event={data!.event} />
                </MenuList>
              </Menu>
            </div>
          )}
        </Flex>
      </BasePageHeader>
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

            <Box>
              <Box>
                <Flex alignItems="center" justifyContent="space-between" mb={4}>
                  <Heading as="h6" variant="h6">
                    Attendees
                  </Heading>
                  {data?.event.owner.id === me?.me?.id && (
                    <Flex alignItems="center">
                      <Text mr={2} variant="body-3">
                        View as admin
                      </Text>
                      <Switch
                        id="admin-toggle"
                        size="md"
                        checked={isViewAdmin}
                        onChange={() => setIsViewAdmin(!isViewAdmin)}
                      />
                    </Flex>
                  )}
                </Flex>
                {isViewAdmin ? (
                  <>
                    <Text variant="body-3" fontWeight="medium">
                      Confirmed
                    </Text>
                    <EventAttendeeTableAdminView
                      isWaitlist={false}
                      eventAttendees={attendeeData!.eventAttendees.filter(
                        (ea) => ea.isConfirmed
                      )}
                      eventId={data?.event.id as number}
                    />

                    <Box mb={6}></Box>

                    <Text variant="body-3" fontWeight="medium">
                      Waitlist
                    </Text>
                    <EventAttendeeTableAdminView
                      isWaitlist={true}
                      eventAttendees={attendeeData!.eventAttendees}
                      eventId={data?.event.id as number}
                    />
                  </>
                ) : (
                  <>
                    <Text variant="body-3" fontWeight="medium">
                      Confirmed
                    </Text>
                    <EventAttendeeTable
                      eventAttendees={attendeeData!.eventAttendees.filter(
                        (ea) => ea.isConfirmed
                      )}
                    />

                    <Box mb={6}></Box>

                    <Text variant="body-3" fontWeight="medium">
                      Waitlist
                    </Text>
                    <EventAttendeeTable
                      eventAttendees={attendeeData!.eventAttendees.filter(
                        (ea) => !ea.isConfirmed
                      )}
                    />
                  </>
                )}
              </Box>
            </Box>
          </>
        ) : (
          <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
            <EventPageSideNav id={id as string} />
            <Box>
              <Box>
                <Flex alignItems="center" justifyContent="space-between" mb={4}>
                  <Heading as="h6" variant="h6">
                    Attendees
                  </Heading>
                  {data?.event.owner.id === me?.me?.id && (
                    <Flex alignItems="center">
                      <Text mr={2} variant="body-3">
                        View as admin
                      </Text>
                      <Switch
                        id="admin-toggle"
                        size="md"
                        defaultChecked={true}
                        onChange={() => setIsViewAdmin(!isViewAdmin)}
                      />
                    </Flex>
                  )}
                </Flex>
                {isViewAdmin ? (
                  <>
                    <Text variant="body-3" fontWeight="medium">
                      Confirmed
                    </Text>
                    <EventAttendeeTableAdminView
                      isWaitlist={false}
                      eventAttendees={attendeeData!.eventAttendees.filter(
                        (ea) => ea.isConfirmed
                      )}
                      eventId={data?.event.id as number}
                    />

                    <Box mb={6}></Box>

                    <Text variant="body-3" fontWeight="medium">
                      Waitlist
                    </Text>
                    <EventAttendeeTableAdminView
                      isWaitlist={true}
                      eventAttendees={attendeeData!.eventAttendees.filter(
                        (ea) => !ea.isConfirmed
                      )}
                      eventId={data?.event.id as number}
                    />
                  </>
                ) : (
                  <>
                    <Text variant="body-3" fontWeight="medium">
                      Confirmed
                    </Text>
                    <EventAttendeeTable
                      eventAttendees={attendeeData!.eventAttendees.filter(
                        (ea) => ea.isConfirmed
                      )}
                    />

                    <Box mb={6}></Box>

                    <Text variant="body-3" fontWeight="medium">
                      Waitlist
                    </Text>
                    <EventAttendeeTable
                      eventAttendees={attendeeData!.eventAttendees.filter(
                        (ea) => !ea.isConfirmed
                      )}
                    />
                  </>
                )}
              </Box>
            </Box>
          </Grid>
        )}
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EventAttendees);
