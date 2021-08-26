import { WarningIcon, PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Link,
  MenuItem,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsPersonFill } from "react-icons/bs";
import { User, Club, MeQuery } from "../generated/graphql";
import { pluralize } from "../utils/pluralize";
import { useIsAuthorised } from "../utils/useIsAuthorised";
import { ClubDeleteButton } from "./ClubDeleteButton";
import { ClubEditButton } from "./ClubEditButton";
import { ClubFollowButton } from "./ClubFollowButton";
import { ClubJoinButton } from "./ClubJoinButton";
import { OptionsButton } from "./OptionsButton";

interface Props {
  club: Club;
  hasLink: Boolean;
  userData: MeQuery;
  onOpen: () => void;
}

const ClubDetailsHeader: React.FC<Props> = ({
  club,
  hasLink,
  userData,
  onOpen,
}) => {
  const isAuthorised = useIsAuthorised(club);

  return (
    <>
      <Box display='flex' justifyContent='space-between'>
        <Box>
          <Heading>
            {hasLink ? (
              <Link href={`/club/${club.id}`}>{club.name}</Link>
            ) : (
              club.name
            )}
          </Heading>
        </Box>
        <OptionsButton>
          {isAuthorised ? (
            <>
              <ClubEditButton club={club} />
              <ClubDeleteButton clubId={club.id} />
            </>
          ) : (
            <MenuItem icon={<WarningIcon />}>Report</MenuItem>
          )}
        </OptionsButton>
      </Box>

      <Box
        _hover={{
          background: "white",
          color: "orange.500",
          cursor: "pointer",
        }}
        onClick={onOpen}
        display={"inline"}
      >
        <Text variant={"body-3"} display={"inline"}>
          <b>{club.followers.length}</b>{" "}
          {pluralize(club.followers.length, "Follower")},{" "}
        </Text>
        <Text variant={"body-3"} display={"inline"}>
          <b>{club.members.length}</b>{" "}
          {pluralize(club.members.length, "Member")}
        </Text>
      </Box>

      <HStack mt={4}>
        <ClubFollowButton
          followerList={club.followers as User[]}
          data={userData}
          clubId={club.id}
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
    </>
  );
};

export { ClubDetailsHeader };
