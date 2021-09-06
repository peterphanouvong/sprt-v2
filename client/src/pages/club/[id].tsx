import {
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { ClubEvents } from "../../components/ClubEvents";
import { ClubFollowButton } from "../../components/ClubFollowButton";
import { ClubFollowingTagline } from "../../components/ClubFollowingTagline";
import { ClubJoinButton } from "../../components/ClubJoinButton";
import { ClubMetaInfo } from "../../components/ClubMetaInfo";
import { ClubOptionsButton } from "../../components/ClubOptionsButton";
import { Layout } from "../../components/Layout";
import {
  Club as Clubtype,
  Event,
  useClubQuery,
  useMeQuery,
  User,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsMobileScreen } from "../../utils/useIsMobileScreen";

const Club = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching }] = useClubQuery({
    pause: intId === -1,
    variables: { clubId: intId },
  });

  const [{ data: userData }] = useMeQuery();
  const isMobile = useIsMobileScreen();

  return (
    <Layout title={data?.club.name}>
      <Head>
        <title>{data?.club.name} | sprt</title>
        <meta name="description" content={data?.club.name} />
      </Head>

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

      <ButtonGroup mt={2}>
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

        {userData && (
          <Button
            onClick={() => router.push(`/club-info/${intId}`)}
            size={isMobile ? "xs" : "sm"}
            colorScheme="gray"
            variant="outline"
          >
            View as admin
          </Button>
        )}

        {data ? (
          <ClubOptionsButton clubId={data?.club.id} />
        ) : (
          <Skeleton width="24px" height="24px" />
        )}
      </ButtonGroup>

      <ClubMetaInfo
        name={
          data?.club.admins[0].firstname + " " + data?.club.admins[0].lastname
        }
        phone={data?.club.phoneNumber}
        email={data?.club.email}
      />

      <Divider my={4} />

      <Text variant="body-3">
        {data?.club.description || !fetching || <SkeletonText noOfLines={5} />}
      </Text>

      {data && <ClubEvents events={data.club.events as Event[]} />}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Club);
