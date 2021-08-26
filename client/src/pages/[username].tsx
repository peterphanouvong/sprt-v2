import React from "react";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

import { Code, Heading, Text } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { useUserByUsernameQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useIsAuth } from "../utils/useIsAuth";
import { Card } from "../components/Card";
import Head from "next/head";

const Profile = () => {
  useIsAuth();
  const router = useRouter();
  const username = router.query.username;
  const [{ data, fetching, error }] = useUserByUsernameQuery({
    variables: {
      username: username as string,
    },
  });
  console.log(data);

  if (fetching) return <>loading..</>;
  if (error) return <Layout>{error.message}</Layout>;
  if (!data?.userByUsername) return <Layout>couldn't find the user</Layout>;

  return (
    <Layout>
      <Head>
        <title>{data.userByUsername.username} | sprt</title>
      </Head>
      <Code>
        <pre id="json">{JSON.stringify(data.userByUsername, null, 2)}</pre>
      </Code>

      <Card>
        <Heading variant="h1">
          {data.userByUsername.firstname} {data.userByUsername.lastname}
        </Heading>
        <Text variant="body-2">
          {data.userByUsername.adminClubs?.map((club) => {
            return <Text key={club.id}>club: {club.name}</Text>;
          })}
        </Text>
        <Text variant="caption">boobies</Text>
      </Card>
      <Card>
        <Heading variant="h1"> Events </Heading>

        {data.userByUsername.events?.map((DEEZ) => {
          return <Text>{DEEZ.title}</Text>;
        })}
      </Card>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Profile);
