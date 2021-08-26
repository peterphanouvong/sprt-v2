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
import {
  Club,
  MeQuery,
  useClubQuery,
  useMeQuery,
  User,
} from "../generated/graphql";
import { pluralize } from "../utils/pluralize";
import { Card } from "./Card";
import { ClubFollowButton } from "./ClubFollowButton";
import { ClubJoinButton } from "./ClubJoinButton";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { ClubDeleteButton } from "./ClubDeleteButton";
import { ClubEditButton } from "./ClubEditButton";
import { OptionsButton } from "./OptionsButton";
import { useIsAuthorised } from "../utils/useIsAuthorised";
import { ClubDetailsModal } from "./ClubDetailsModal";
interface Props {
  club: Club;
  hasLink?: boolean;
  userData: MeQuery;
}

const ClubSimpleCard: React.FC<Props> = ({ club, hasLink, userData }) => {
  const isAuthorised = useIsAuthorised(club);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!userData) {
    return <Spinner></Spinner>;
  }

  return (
    <Card>
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

      <Text variant={"body-2"} marginY={4}>
        {club.description}
      </Text>

      <ClubDetailsModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        clubId={club.id}
        userData={userData}
      />
    </Card>
  );
};

export { ClubSimpleCard };
