import { Grid, Code } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { BaseCard } from "../../../components/BaseCard";
import { BaseContent } from "../../../components/BaseContent";
import { BaseLayout } from "../../../components/BaseLayout";
import { BasePageHeader } from "../../../components/BasePageHeader";
import { BaseSection } from "../../../components/BaseSection";
import { EventPageSideNav } from "../../../components/EventPageSideNav";
import { EventSignUpForm } from "../../../components/EventSignUpForm";
import { QuickEventJoinForm } from "../../../components/QuickEventJoinForm";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useIsAuth } from "../../../utils/useIsAuth";

interface Props {}

const EventSignUp: React.FC<Props> = ({}) => {
  useIsAuth();
  const router = useRouter();
  const { id } = router.query;

  return (
    <BaseLayout>
      <Head>
        <title>EventSignUp | sprt</title>
      </Head>
      <BasePageHeader>Event {id}</BasePageHeader>

      <BaseContent flex={1}>
        <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
          <EventPageSideNav id={id as string} />
          <BaseCard padding={6}>
            <BaseSection title="Sign up">
              <Code>
                // TODO: Create the sign up form
                <br />
                // TODO: Create the attendee list
                <br />
                // TODO: Create an upload recording form
              </Code>

              <EventSignUpForm
                eventId={parseInt(id as string)}
                isFull={false}
              />
            </BaseSection>
          </BaseCard>
        </Grid>
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EventSignUp);
