import { Grid } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { BaseBreadcrumbs } from "../../components/BaseBreadcrumbs";
import { BaseContent } from "../../components/BaseContent";
import { BaseLayout } from "../../components/BaseLayout";
import { BasePageHeader } from "../../components/BasePageHeader";
import { EventFreshForm } from "../../components/EventFreshForm";
import { NewEventSideNav } from "../../components/NewEventSideNav";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/useIsAuth";
import { useIsMobileScreen } from "../../utils/useIsMobileScreen";

interface Props {}

const EventDetails: React.FC<Props> = ({}) => {
  useIsAuth();
  const isMobile = useIsMobileScreen();
  return (
    <BaseLayout>
      <Head>
        <title>EventDetails | sprt</title>
      </Head>

      <BasePageHeader>Event details</BasePageHeader>
      <BaseContent>
        {isMobile ? (
          <>
            <BaseBreadcrumbs
              crumbs={[
                { href: "/new-event", title: "Choose path" },
                { href: "/new-event/event-details/", title: "Event details" },
              ]}
            />
            <EventFreshForm />
          </>
        ) : (
          <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
            <NewEventSideNav isFromTemplate={false} />
            <EventFreshForm />
          </Grid>
        )}
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EventDetails);
