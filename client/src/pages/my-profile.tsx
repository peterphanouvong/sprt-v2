import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { Text } from "@chakra-ui/react";
import { useIsAuth } from "../utils/useIsAuth";

interface Props {}

const MyProfile: React.FC<Props> = ({}) => {
  useIsAuth();

  return (
    <Layout>
      <Text as="h1" fontSize="large">
        My Profile
      </Text>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(MyProfile);
