import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { ProgressBar } from "../components/ProgressBar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

interface Props {}
const steps = ["One", "Two", "Three"];

const Home: React.FC<Props> = ({}) => {
  useIsAuth();

  const [index, setIndex] = useState(1);

  const prev = () => {
    setIndex(index - 1);
  };
  const next = () => {
    setIndex(index + 1);
  };
  return (
    <Layout>
      <Head>
        <title>Home | sprt</title>
      </Head>
      <Text as="h1" fontSize="large">
        Home page
      </Text>
      wtf
      <ProgressBar steps={steps} currentIndex={index} />
      <ButtonGroup>
        <Button onClick={prev}>prev</Button>
        <Button onClick={next}>next</Button>
      </ButtonGroup>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
