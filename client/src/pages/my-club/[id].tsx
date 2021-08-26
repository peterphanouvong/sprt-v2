import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { ClubCreateButton } from "../../components/ClubCreateButton";
import { ClubDeleteButton } from "../../components/ClubDeleteButton";
import { ClubEditButton } from "../../components/ClubEditButton";
import { ClubEvents } from "../../components/ClubEvents";
import { ClubFollowingTagline } from "../../components/ClubFollowingTagline";
import { ClubMetaInfo } from "../../components/ClubMetaInfo";
import { Layout } from "../../components/Layout";
import { Event, useClubByAdminIdQuery } from "../../generated/graphql";
import nothingHere from "../../images/nothing-here.svg";
import { createUrqlClient } from "../../utils/createUrqlClient";

const MyClub = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching, error }] = useClubByAdminIdQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  console.log(error);

  if (error?.message === "[GraphQL] Cannot read property 'clubId' of undefined")
    return (
      <Layout>
        <VStack paddingX={20} paddingY={5}>
          <Image src={nothingHere} />
          <Text textAlign="center">Looks like you don't have a club yet</Text>
          <Box pt={4}></Box>
          {/* <Button>Create a club</Button> */}
          <ClubCreateButton />
        </VStack>
      </Layout>
    );

  return (
    <Layout title={data?.clubByAdminId.name}>
      <Heading as="h2" variant="h2">
        {data?.clubByAdminId.name || (
          <Skeleton height="30px" width="100px">
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
        <Skeleton width="150px" height="15px" mt={1}>
          <Text>X Follower, X Members</Text>
        </Skeleton>
      )}

      <HStack mt={2} spacing={2}>
        {data ? (
          <>
            <ClubEditButton clubId={data?.clubByAdminId.id} as="button" />
            <ClubDeleteButton clubId={data?.clubByAdminId.id} as="button" />
          </>
        ) : (
          <>
            <Skeleton />
            <Skeleton />
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

      <Text variant="body-3">
        {data?.clubByAdminId.description || (
          <SkeletonText isLoaded={!fetching} noOfLines={5} />
        )}
      </Text>

      {data && (
        <ClubEvents mine={true} events={data.clubByAdminId.events as Event[]} />
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(MyClub);
