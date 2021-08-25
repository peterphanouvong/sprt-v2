import { PhoneIcon, EmailIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Heading,
  HStack,
  Box,
  Icon,
  useDisclosure,
  Text,
  Link,
  useBreakpointValue,
  MenuItem,
  Spinner,
} from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import React from "react";
import { useRouter } from "next/router";
import { BsPersonFill } from "react-icons/bs";
import { Club, useClubQuery, useMeQuery, User } from "../generated/graphql";
import { pluralize } from "../utils/pluralize";
import { Card } from "./Card";
import { ClubFollowButton } from "./ClubFollowButton";
import { ClubJoinButton } from "./ClubJoinButton";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { ClubDeleteButton } from "./ClubDeleteButton";
import { ClubEditButton } from "./ClubEditButton";
import { OptionsButton } from "./OptionsButton";
interface Props {
  club: Club;
  modalOpen?: () => void;
  modalClose?: () => void;
  hasLink?: boolean;
}

const ClubSimpleCard: React.FC<Props> = ({ club, modalOpen, hasLink }) => {
  const [{ data: userData }] = useMeQuery();

  const [followers, setFollowers] = React.useState<User[]>(
    club.followers as User[]
  );
  const [members, setMembers] = React.useState<User[]>(
    club.members as unknown as User[]
  );

  const isAuthorised = (club: Club) => {
    if (!userData) {
      return false;
    }
    return club.admins
      .map((admin) => admin.username)
      .includes(userData.me!.username);
  };

  const addFollower = () => {
    setFollowers([...followers, userData!.me as User]);
  };

  const removeFollower = () => {
    console.log(followers);
    const newFollowers = followers.filter(
      (user) => user.id !== userData!.me!.id
    );
    console.log(newFollowers);
    setFollowers(newFollowers);
  };
  if (!userData) {
    return <Spinner></Spinner>;
  }
  return (
    <Card>
      <Box display='flex' justifyContent='space-between'>
        <Box>
          <Heading mb={4}>
            {hasLink ? (
              <Link href={`/club/${club.id}`}>{club.name}</Link>
            ) : (
              club.name
            )}
          </Heading>
        </Box>
        <OptionsButton>
          {isAuthorised(club) ? (
            <>
              <ClubEditButton club={club} />
              <ClubDeleteButton clubId={club.id} />
            </>
          ) : (
            <MenuItem icon={<WarningIcon />}>Report</MenuItem>
          )}
        </OptionsButton>
      </Box>
      <HStack>
        <ClubFollowButton
          followerList={club.followers as User[]}
          data={userData}
          clubId={club.id}
          addFollower={addFollower}
          removeFollower={removeFollower}
        />
        <ClubJoinButton club={club as Club} />
      </HStack>

      <Box mt={4}>
        <Text variant={"label"} mb={1}>
          <Icon as={BsPersonFill} w={3} h={3} mr={1} />
          {club.admins[0]
            ? club.admins[0].firstname + " " + club.admins[0].lastname
            : "Error displaying"}
        </Text>
        <Text variant={"label"} mb={1}>
          <PhoneIcon w={3} h={3} mr={1} />
          {club.phoneNumber}
        </Text>
        <Text variant={"label"}>
          <EmailIcon w={3} h={3} mr={1} />
          {club.email}
        </Text>
      </Box>

      <Text variant={"body-2"} marginY={4}>
        {club.description}
      </Text>
      <Box onClick={modalOpen} display={"inline"}>
        <Text variant={"body-3"} display={"inline"}>
          <b>{followers.length}</b> {pluralize(followers.length, "Follower")},{" "}
        </Text>
        <Text variant={"body-3"} display={"inline"}>
          <b>{members.length}</b> {pluralize(members.length, "Member")}
        </Text>
      </Box>
    </Card>
  );
};

export { ClubSimpleCard };
