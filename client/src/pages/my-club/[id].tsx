import {
  Divider,
  Heading,
  HStack,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Card } from "../../components/Card";
import { ClubDeleteButton } from "../../components/ClubDeleteButton";
import { ClubEditButton } from "../../components/ClubEditButton";
import { ClubEvents } from "../../components/ClubEvents";
import { ClubFollowButton } from "../../components/ClubFollowButton";
import { ClubFollowingTagline } from "../../components/ClubFollowingTagline";
import { ClubJoinButton } from "../../components/ClubJoinButton";
import { ClubMetaInfo } from "../../components/ClubMetaInfo";
import { Layout } from "../../components/Layout";
import { Event, useClubByAdminIdQuery, User } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const MyClub = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, error }] = useClubByAdminIdQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (error) return <Layout>{error.message}</Layout>;

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
        {data?.clubByAdminId.description || <SkeletonText noOfLines={5} />}
      </Text>

      {data && (
        <ClubEvents mine={true} events={data.clubByAdminId.events as Event[]} />
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(MyClub);
