import { Grid, Code } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { BaseContent } from "../../../components/BaseContent";
import { BaseLayout } from "../../../components/BaseLayout";
import { BasePageHeader } from "../../../components/BasePageHeader";
import { BaseSection } from "../../../components/BaseSection";
import { EventPageSideNav } from "../../../components/EventPageSideNav";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useIsAuth } from "../../../utils/useIsAuth";

interface Props {}

const EventAttendees: React.FC<Props> = ({}) => {
  useIsAuth();
  const router = useRouter();
  const { id } = router.query;

  return (
    <BaseLayout>
      <Head>
        <title>EventAttendees | sprt</title>
      </Head>
      <BasePageHeader>Event {id}</BasePageHeader>

      <BaseContent flex={1}>
        <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
          <EventPageSideNav id={id as string} />
          <BaseSection title="Attendees">
            <Code>
              // TODO: Create the sign up form
              <br />
              // TODO: Create the attendee list
              <br />
              // TODO: Create an upload recording form
            </Code>
          </BaseSection>
        </Grid>
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EventAttendees);
