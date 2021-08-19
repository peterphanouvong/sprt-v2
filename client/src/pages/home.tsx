import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { Input, Text } from "@chakra-ui/react";
import { useIsAuth } from "../utils/useIsAuth";
import { Card } from "../components/Card";
import Select from "react-select";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  useIsAuth();

  return (
    <Layout>
      <Text as="h1" fontSize="large">
        Home page
      </Text>
      <Select />

      <Input />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
