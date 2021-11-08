import { Grid } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { BaseContent } from "../../components/BaseContent";
import { BaseLayout } from "../../components/BaseLayout";
import { BasePageHeader } from "../../components/BasePageHeader";
import { EventFreshForm } from "../../components/EventFreshForm";
import { NewEventSideNav } from "../../components/NewEventSideNav";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/useIsAuth";

interface Props {}

const EventDetails: React.FC<Props> = ({}) => {
  useIsAuth();

  return (
    <BaseLayout>
      <Head>
        <title>EventDetails | sprt</title>
      </Head>

      <BasePageHeader>Event details</BasePageHeader>
      <BaseContent>
        <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
          <NewEventSideNav isFromTemplate={false} />
          <EventFreshForm />
        </Grid>
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EventDetails);
