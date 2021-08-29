import { Box, Divider, Flex, Heading, Link, Tag, Text } from "@chakra-ui/react";
import Image from "next/image";
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
import nothingHere from "../images/nothing-here.svg";
import { useIsLoggedIn } from "../utils/useIsLoggedIn";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";

const Profile = () => {
  // useIsAuth();
  const isLoggedIn = useIsLoggedIn();
  const router = useRouter();
  const username = router.query.username;
  const [{ data, fetching, error }] = useUserByUsernameQuery({
    variables: {
      username: username as string,
    },
  });
  const isMobile = useIsMobileScreen();

  if (!isLoggedIn) {
    return (
      <Layout>
        <Heading as='h3' variant='h3'>
          Profile
        </Heading>
        <Box mt={32} textAlign='center'>
          <Heading mb={8} as='h6' variant='h6' textAlign='center'>
            Log in to view this page!
          </Heading>
          <br />
          <Image src={nothingHere} width='200px' height='200px' />
        </Box>
      </Layout>
    );
  }

  if (fetching) return <>loading..</>;
  if (error) return <Layout>{error.message}</Layout>;
  if (!data?.userByUsername) return <Layout>couldn't find the user</Layout>;

  return (
    <Layout>
      <Head>
        <title>{data.userByUsername.username} | sprt</title>
      </Head>
      <Heading variant='h2'>
        {data.userByUsername.firstname} {data.userByUsername.lastname}
      </Heading>
      {data.userByUsername.adminClubs?.map((x) => (
        <NextLink key={x.id} href={`/club/${x.id}`}>
          <Tag variant='subtle' my={2}>
            <Link>{x.name}</Link>
          </Tag>
        </NextLink>
      ))}

      {/* {data.} */}
      <Text variant='body-2'>
        <b>{data.userByUsername.followingClubs?.length}</b> Following
      </Text>

      <Divider my={2} />

      <Flex justifyContent='space-between'>
        <Heading variant='h4'> Events </Heading>
        <EventCreateButton size={isMobile ? "sm" : "md"} />
      </Flex>

      <EventList mine={true} events={data.userByUsername.events as Event[]} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Profile);
