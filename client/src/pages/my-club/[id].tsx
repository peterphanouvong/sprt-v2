import {
  Box,
  Divider,
  Heading,
  HStack,
  Skeleton,
  SkeletonText,
  Text,
  Image as ChakraImage,
  Container,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { ClubBanner } from "../../components/ClubBanner";
import { ClubCreateButton } from "../../components/ClubCreateButton";
import { ClubDeleteButton } from "../../components/ClubDeleteButton";
import { ClubEditButton } from "../../components/ClubEditButton";
import { ClubEvents } from "../../components/ClubEvents";
import { ClubFollowingTagline } from "../../components/ClubFollowingTagline";
import { ClubMetaInfo } from "../../components/ClubMetaInfo";
import { Layout } from "../../components/Layout";
import {
  ClubByAdminIdQuery,
  Event,
  useClubByAdminIdQuery,
} from "../../generated/graphql";
import nothingHere from "../../images/nothing-here.svg";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/useIsAuth";
import { useIsMobileScreen } from "../../utils/useIsMobileScreen";

const MyClub = () => {
  useIsAuth();
  const isMobile = useIsMobileScreen();
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching, error }] = useClubByAdminIdQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (error?.message === "[GraphQL] Cannot read property 'clubId' of undefined")
    return (
      <Layout>
        <Box textAlign='center'>
          <Text variant='body-2' textAlign='center'>
            Looks like you don't have a club yet
          </Text>
          <ClubCreateButton my={6} width='min' />
          <br />
          <Image src={nothingHere} width='200px' height='200px' />
        </Box>
      </Layout>
    );

  return (
    <Layout title={data?.clubByAdminId.name}>
      <Head>
        <title>{data?.clubByAdminId.name} | sprt</title>
        <meta name='description' content={data?.clubByAdminId.name} />
      </Head>

      <ClubBanner club={data as ClubByAdminIdQuery} />

      {/* <ChakraImage
        position='absolute'
        // top='30px'
        // left='10px'
        border='1px solid black'
        borderRadius='full'
        boxSize={32}
        src={`https://storage.cloud.google.com/test-sprt-bucket/Kevin's_Club/stings_logo.png`}
      /> */}

      <Container
        paddingX={4}
        maxW='container.lg'
        // style={{ backgroundColor: "rgb(247,249,251)" }}
      >
        {/* <ChakraImage
          position='absolute'
          top='40%'
          // left='clamp(3vw, 10%, 1.5em)'
          border='1px solid black'
          borderRadius='full'
          boxSize={isMobile ? 28 : 32}
          src={`https://storage.cloud.google.com/test-sprt-bucket/Kevin's_Club/stings_logo.png`}
        /> */}
        <Heading as='h2' variant='h2' mt={isMobile ? 20 : 28}>
          {data?.clubByAdminId.name || (
            <Skeleton height='30px' width='100px'>
              Club name
            </Skeleton>
          )}
        </Heading>

        {data ? (
          <ClubFollowingTagline
            followerCount={data.clubByAdminId.followers.length}
            memberCount={data.clubByAdminId.members.length}
            clubId={data.clubByAdminId.id}
          />
        ) : (
          <Skeleton width='150px' height='15px' mt={1}>
            <Text>X Follower, X Members</Text>
          </Skeleton>
        )}

        <HStack mt={2} spacing={2}>
          {data ? (
            <>
              <ClubEditButton clubId={data?.clubByAdminId.id} as='button' />
              <ClubDeleteButton clubId={data?.clubByAdminId.id} as='button' />
            </>
          ) : (
            <>
              <Skeleton height='24px' width='50px' />
              <Skeleton height='24px' width='50px' />
            </>
          )}
        </HStack>

        <ClubMetaInfo
          name={
            data?.clubByAdminId.admins[0].firstname +
            " " +
            data?.clubByAdminId.admins[0].lastname
          }
          phone={data?.clubByAdminId.phoneNumber}
          email={data?.clubByAdminId.email}
        />

        <Divider my={4} />

        <Text variant='body-3'>
          {data?.clubByAdminId.description || (
            <SkeletonText isLoaded={!fetching} noOfLines={5} />
          )}
        </Text>

        {data && (
          <ClubEvents
            mine={true}
            events={data.clubByAdminId.events as Event[]}
          />
        )}
      </Container>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(MyClub);
