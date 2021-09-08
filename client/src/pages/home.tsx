import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { Input, Text } from "@chakra-ui/react";
import { useIsAuth } from "../utils/useIsAuth";
import Select from "react-select";
import Head from "next/head";
import { EventJoinWaitlistButton } from "../components/EventJoinWaitlistButton";

interface Props {}

const options = [
  { label: "option", value: "1" },
  { label: "option", value: "2" },
  { label: "option", value: "3" },
  { label: "option", value: "4" },
];
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
