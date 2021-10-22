import { Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { BaseLayout } from "../components/BaseLayout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  useIsAuth();
  return (
    <BaseLayout>
      <Head>
        <title>Home | sprt</title>
      </Head>
      <Text as="h1" fontSize="large">
        Home page
      </Text>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
