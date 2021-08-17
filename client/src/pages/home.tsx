import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { Text } from "@chakra-ui/react";
import { useIsAuth } from "../utils/useIsAuth";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  useIsAuth();

  return (
    <Layout>
      <Text as="h1" fontSize="large">
        Home page
      </Text>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
