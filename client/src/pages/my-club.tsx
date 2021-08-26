import { Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { useMeQuery, usePostQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const MyClub = () => {
  const [{ data, fetching }] = useMeQuery();

  console.log(data);

  if (!data && !fetching) return <Layout>something went wrong</Layout>;

  return (
    <Layout>
      <Card>
        <Heading mb={4}>{data.post.title}</Heading>
        <Text>{data.post.description}</Text>
      </Card>

      <Card></Card>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(MyClub);
