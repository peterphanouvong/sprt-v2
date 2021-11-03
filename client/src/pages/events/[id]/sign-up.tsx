import { Alert, AlertIcon, Code, Grid, Spinner } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
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
import { useEventQuery } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useIsAuth } from "../../../utils/useIsAuth";
import { EventSignUpStuff } from "../../../components/EventSignUpStuff";

interface Props {}

const EventSignUp: React.FC<Props> = ({}) => {
  useIsAuth();
  const router = useRouter();
  const { id } = router.query;

  const [{ data, fetching }] = useEventQuery({
    pause: id === undefined,
    variables: { id: id as string },
  });

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
      <BasePageHeader>{data?.event.title}</BasePageHeader>

      <BaseContent flex={1}>
        <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
          <EventPageSideNav id={id as string} />
          <EventSignUpStuff id={id as string} />
        </Grid>
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EventSignUp);
