import { VStack, Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { Club } from "../generated/graphql";
import { ClubListItem } from "./ClubListItem";
import { MotionBox } from "./MotionBox";
import waiting from "../images/waiting.svg";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface Props {
  clubs: Club[];
  sorryText?: string;
}

const ClubList: React.FC<Props> = ({ clubs, sorryText }) => {
  return clubs.length === 0 ? (
    <VStack>
      <Box paddingX={16} paddingY={5}>
        <Image src={waiting} width="200px" height="200px" />
      </Box>
      <Text variant="body-2" textAlign="center">
        {sorryText || "Looks like there aren't any clubs..."}
      </Text>
    </VStack>
  ) : (
    <MotionBox variants={container} initial="hidden" animate="show">
      {clubs.map((club) => {
        return (
          <MotionBox variants={item} mt={4} key={club.id}>
            <ClubListItem club={club} />
          </MotionBox>
        );
      })}
    </MotionBox>
  );
};

export { ClubList };
