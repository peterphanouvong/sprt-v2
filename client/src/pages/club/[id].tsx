import {
  Divider,
  Heading,
  HStack,
  Link,
  Skeleton,
  SkeletonText,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ClubEvents } from "../../components/ClubEvents";
import { ClubFollowButton } from "../../components/ClubFollowButton";
import { ClubFollowingTagline } from "../../components/ClubFollowingTagline";
import { ClubJoinButton } from "../../components/ClubJoinButton";
import { ClubMetaInfo } from "../../components/ClubMetaInfo";
import { Layout } from "../../components/Layout";
import {
  Club as Clubtype,
  Event,
  useClubQuery,
  useMeQuery,
  User,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { RenderPrettyJSON } from "../../utils/renderPrettyJSON";

const Club = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data }] = useClubQuery({
    pause: intId === -1,
    variables: { clubId: intId },
  });

  const [{ data: userData }] = useMeQuery();

  return (
    <Layout title={data?.club.name}>
      <Heading as="h2" variant="h2">
        {data?.club.name || (
          <Skeleton height="30px" width="100px">
            Club name
          </Skeleton>
        )}
      </Heading>

      {data ? (
        <ClubFollowingTagline
          followerCount={data.club.followers.length}
          memberCount={data.club.members.length}
          clubId={data.club.id}
        />
      ) : (
        <Skeleton width="150px" height="15px" mt={1}>
          <Text>X Follower, X Members</Text>
        </Skeleton>
      )}

      <HStack mt={2}>
        {userData && data ? (
          <ClubFollowButton
            followerList={data?.club.followers as User[]}
            data={userData}
            clubId={data?.club.id}
          />
        ) : (
          <Skeleton width="100px" height="24px" />
        )}
        {data ? (
          <ClubJoinButton club={data?.club as Clubtype} />
        ) : (
          <Skeleton width="100px" height="24px" />
        )}
      </HStack>

      <ClubMetaInfo
        name={
          data?.club.admins[0].firstname + " " + data?.club.admins[0].lastname
        }
        phone={data?.club.phoneNumber}
        email={data?.club.email}
      />

      <Divider my={4} />

      <Text variant="body-3">
        {data?.club.description || <SkeletonText noOfLines={5} />}
      </Text>

      {data && <ClubEvents events={data.club.events as Event[]} />}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Club);
