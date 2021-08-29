import { Box, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { pluralize } from "../utils/pluralize";
import { ClubDetailsModal } from "./ClubDetailsModal";

interface Props {
  clubId: number;
  followerCount: number;
  memberCount: number;
}

const ClubFollowingTagline: React.FC<Props> = ({
  clubId,
  followerCount,
  memberCount,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box mt={1}>
        <Text
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          variant='body-3'
          _hover={{ cursor: "pointer" }}
        >
          <b>{followerCount}</b> {pluralize(0, "Follower")},{" "}
          <b>{memberCount}</b> {pluralize(0, "Member")}
        </Text>
      </Box>

      <ClubDetailsModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        clubId={clubId}
      />
    </>
  );
};

export { ClubFollowingTagline };
