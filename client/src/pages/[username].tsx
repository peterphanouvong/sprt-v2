import React from "react";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRouter } from "next/router";

import { Heading, Text } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { useMeQuery } from "../generated/graphql";
import { Card } from "../components/Card";

const Profile = () => {
  const [{ data, fetching, error }] = useMeQuery({});

  console.log(data);

  if (fetching) return <>loading..</>;
  if (error) return <Layout>{error.message}</Layout>;
  if (!data?.me) return <Layout>couldn't find the user</Layout>;

  return (
    <Layout>
      <Card>
        <Heading mb={4}> {data.me.username}</Heading>
        <Text>{data.me.email}</Text>
      </Card>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Profile);
