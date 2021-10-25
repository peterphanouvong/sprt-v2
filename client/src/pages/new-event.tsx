import { Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { BaseLayout } from "../components/BaseLayout";
import { QuickEventForm } from "../components/QuickEventForm";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

interface Props {}

const NewEvent: React.FC<Props> = ({}) => {
  useIsAuth();

  return (
    <BaseLayout>
      <Head>
        <title>New Event | sprt</title>
      </Head>

      <Heading as="h1" variant="h1">
        Create New Event
      </Heading>
      <QuickEventForm />
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(NewEvent);
