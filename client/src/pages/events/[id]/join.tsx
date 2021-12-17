import {
  Flex,
  Grid,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { BaseContent } from "../../../components/BaseContent";
import { BaseLayout } from "../../../components/BaseLayout";
import { BasePageHeader } from "../../../components/BasePageHeader";
import { EventPageSideNav } from "../../../components/EventPageSideNav";
import { EventSignUpStuff } from "../../../components/EventSignUpStuff";
import { useEventQuery, useMeQuery } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { Event } from "../../../generated/graphql";
import { EventPageOverview } from "../../../components/EventPageOverview";
import { useIsMobileScreen } from "../../../utils/useIsMobileScreen";
import { BaseBreadcrumbs } from "../../../components/BaseBreadcrumbs";
import { SettingsIcon } from "@chakra-ui/icons";
import { EventDeleteModal } from "../../../components/EventDeleteModal";
interface Props {}

const EventJoin: React.FC<Props> = ({}) => {
  const isMobile = useIsMobileScreen();

  const router = useRouter();
  const { id } = router.query;

  const [{ data, fetching }] = useEventQuery({
    pause: id === undefined,
    variables: { id: id as string },
  });
  const [{ data: me }] = useMeQuery();
  if (fetching) {
    return <Spinner />;
  }

  if (!fetching && !data?.event) {
    return <>Event not found</>;
  }

  return (
    <BaseLayout>
      <Head>
        <title>EventSignUp | sprt</title>
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
            <EventSignUpStuff
              id={id as string}
              clubBeemId={data!.event.clubBeemId}
            />
          </>
        ) : (
          <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
            <EventPageSideNav id={id as string} />
            <EventSignUpStuff
              id={id as string}
              clubBeemId={data!.event.clubBeemId}
            />
          </Grid>
        )}
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EventJoin);
