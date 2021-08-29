import { Heading, HStack, Link, Skeleton, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Club, useMeQuery, User } from "../generated/graphql";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { Card } from "./Card";
import { ClubFollowButton } from "./ClubFollowButton";
import { ClubFollowingTagline } from "./ClubFollowingTagline";
import { ClubJoinButton } from "./ClubJoinButton";
import { ClubMetaInfo } from "./ClubMetaInfo";
import { ClubOptionsButton } from "./ClubOptionsButton";

interface Props {
  club: Club;
}

const ClubListItem: React.FC<Props> = ({ club }) => {
  const [{ data: userData }] = useMeQuery();
  const isMobile = useIsMobileScreen();
  const router = useRouter();

  return (
    <Card
      onClick={isMobile ? () => router.push(`/club/${club.id}`) : undefined}
    >
      <NextLink href={`/club/${club.id}`}>
        <Heading as="h3" variant="h3">
          <Link>{club.name}</Link>
        </Heading>
      </NextLink>

      <ClubFollowingTagline
        followerCount={club.followers.length}
        memberCount={club.members.length}
        clubId={club.id}
      />

      <HStack mt={2}>
        {userData ? (
          <ClubFollowButton
            followerList={club.followers as User[]}
            data={userData}
            clubId={club.id}
          />
        ) : (
          <Skeleton width="100px" />
        )}

        <ClubJoinButton club={club as Club} />

        <ClubOptionsButton clubId={club.id} />
      </HStack>

      <ClubMetaInfo
        name={club.admins[0].firstname + " " + club.admins[0].lastname}
        phone={club.phoneNumber}
        email={club.email}
      />

      <Text mt={4} variant="body-3">
        {club.description}
      </Text>
    </Card>
  );
};

export { ClubListItem };
