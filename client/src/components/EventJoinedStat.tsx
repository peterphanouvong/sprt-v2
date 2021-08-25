import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { User } from "../generated/graphql";

interface Props {
  attendees: User[];
  capacity: number | undefined | null;
  onOpen: () => void;
}

const EventJoinedStat: React.FC<Props> = ({ attendees, capacity, onOpen }) => {
  return (
    <Box _hover={{ cursor: "pointer" }} onClick={onOpen} textAlign="right">
      {capacity ? (
        <>
          <Heading variant="h4">
            {attendees.length}/{capacity}
          </Heading>
          <Text variant="label">Already joined</Text>
        </>
      ) : (
        <>
          <Heading variant="h4">{attendees.length}</Heading>
          <Text variant="label">Already joined</Text>
        </>
      )}
    </Box>
  );
};

export { EventJoinedStat };
