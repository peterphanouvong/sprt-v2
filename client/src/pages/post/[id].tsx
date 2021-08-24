import React from "react";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { Heading, Text } from "@chakra-ui/react";
import { Card } from "../../components/Card";

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

  console.log(data);

  if (fetching) return <>loading..</>;
  if (error) return <Layout>{error.message}</Layout>;
  if (!data?.post) return <Layout>couldn't find the post</Layout>;

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

export default withUrqlClient(createUrqlClient)(Post);
