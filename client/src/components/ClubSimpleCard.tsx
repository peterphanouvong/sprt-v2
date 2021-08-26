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
  Divider,
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
import { ClubDetailsHeader } from "./ClubDetailsHeader";
interface Props {
  club: Club;
  hasLink?: boolean;
  isClubPage?: boolean;
  userData: MeQuery;
}

const ClubSimpleCard: React.FC<Props> = ({
  club,
  hasLink,
  userData,
  isClubPage,
}) => {
  const isAuthorised = useIsAuthorised(club);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!userData) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      {isClubPage && (
        <>
          <ClubDetailsHeader
            club={club}
            hasLink={hasLink}
            userData={userData}
            onOpen={onOpen}
          />
          <Divider mt={2} />
        </>
      )}

      {/* <Card> */}
      {!isClubPage && (
        <ClubDetailsHeader
          club={club}
          hasLink={hasLink}
          userData={userData}
          onOpen={onOpen}
        />
      )}

      <Text variant={"body-3"} marginY={2}>
        {club.description}
      </Text>

      <ClubDetailsModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        clubId={club.id}
        userData={userData}
      />
      {/* </Card> */}
    </>
  );
};

export { ClubSimpleCard };
