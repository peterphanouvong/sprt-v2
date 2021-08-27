import { Divider, Flex, Heading, Link, Tag, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { EventCreateButton } from "../components/EventCreateButton";
import { EventList } from "../components/EventList";
import { Layout } from "../components/Layout";
import { Event, useUserByUsernameQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";

const Profile = () => {
  useIsAuth();
  const router = useRouter();
  const username = router.query.username;
  const [{ data, fetching, error }] = useUserByUsernameQuery({
    variables: {
      username: username as string,
    },
  });
  const isMobile = useIsMobileScreen();
  console.log(data);

  if (fetching) return <>loading..</>;
  if (error) return <Layout>{error.message}</Layout>;
  if (!data?.userByUsername) return <Layout>couldn't find the user</Layout>;

  return (
    <Layout>
      <Head>
        <title>{data.userByUsername.username} | sprt</title>
      </Head>
      <Heading variant="h2">
        {data.userByUsername.firstname} {data.userByUsername.lastname}
      </Heading>
      {data.userByUsername.adminClubs?.map((x) => (
        <NextLink key={x.id} href={`/club/${x.id}`}>
          <Tag variant="subtle" my={2}>
            <Link>{x.name}</Link>
          </Tag>
        </NextLink>
      ))}

      {/* {data.} */}
      <Text variant="body-2">
        <b>{data.userByUsername.followingClubs?.length}</b> Following
      </Text>

      <Divider my={2} />

      <Flex justifyContent="space-between">
        <Heading variant="h4"> Events </Heading>
        <EventCreateButton size={isMobile ? "sm" : "md"} />
      </Flex>

      <EventList mine={true} events={data.userByUsername.events as Event[]} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Profile);
