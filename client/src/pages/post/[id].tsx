import React from "react";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { Heading, Text } from "@chakra-ui/react";
import { Card } from "../../components/Card";
import Head from "next/head";

const Post = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching, error }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (fetching) return <>loading..</>;
  if (error) return <Layout>{error.message}</Layout>;
  if (!data?.post) return <Layout>couldn't find the post</Layout>;

  return (
    <Layout>
      <Head>
        <title>data.post.title | sprt</title>
      </Head>
      <Card>
        <Heading mb={4}>{data.post.title}</Heading>
        <Text>{data.post.description}</Text>
      </Card>

      <Card></Card>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Post);
