import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { Heading } from "@chakra-ui/react";

const Index = () => {
  return (
    <Layout>
      <Heading variant="display-1">Hey there</Heading>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
