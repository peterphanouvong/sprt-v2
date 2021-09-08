import { Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  useIsAuth();

  return (
    <Layout>
      <Head>
        <title>Home | sprt</title>
      </Head>
      <Text as="h1" fontSize="large">
        Home page
      </Text>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
