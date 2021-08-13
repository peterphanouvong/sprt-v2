import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { Text } from "@chakra-ui/react";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  return (
    <Layout>
      <Text as="h1" fontSize="large">
        Home page
      </Text>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
