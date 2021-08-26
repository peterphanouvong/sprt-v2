import {
  Text,
  Heading,
  Box,
  Flex,
  Spacer,
  Icon,
  Link,
  Skeleton,
  HStack,
  Divider,
  SkeletonText,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Card } from "../../components/Card";
import { Layout } from "../../components/Layout";
import {
  useClubQuery,
  Event,
  User,
  useMeQuery,
  Club as Clubtype,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { EventList } from "../../components/EventList";
import { EventCreateButton } from "../../components/EventCreateButton";
import { FaVolleyballBall } from "react-icons/fa";
import { EventListSkeleton } from "../../components/EventListSkeleton";
import NextLink from "next/link";
import { ClubFollowingTagline } from "../../components/ClubFollowingTagline";
import { ClubFollowButton } from "../../components/ClubFollowButton";
import { ClubJoinButton } from "../../components/ClubJoinButton";

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
    <Layout>
      <NextLink href={`/club/${data?.club.id}`}>
        <Link>
          <Heading as="h3" variant="h3">
            {data?.club.name || (
              <Skeleton height="30px" width="100px">
                Club name
              </Skeleton>
            )}
          </Heading>
        </Link>
      </NextLink>

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

      <Divider my={4} />

      <Text variant="body-3">
        {data?.club.description || <SkeletonText noOfLines={5} />}
      </Text>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Club);
