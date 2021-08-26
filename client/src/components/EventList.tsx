import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Event } from "../generated/graphql";
import { EventCard } from "./EventCard";
import { MotionBox } from "./MotionBox";
import Image from "next/image";
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
  events: Event[];
  sorryText?: string;
}

const EventList: React.FC<Props> = ({ events, sorryText }) => {
  return events.length === 0 ? (
    <VStack>
      <Box paddingX={16} paddingY={5}>
        <Image src={waiting} />
      </Box>
      <Text variant="body-2" textAlign="center">
        {sorryText || "Looks like there aren't any events..."}
      </Text>
    </VStack>
  ) : (
    <>
      <Box align="stretch">
        <MotionBox variants={container} initial="hidden" animate="show">
          {events
            .sort((a: any, b: any) => b.updatedAt - a.updatedAt)
            //@ts-ignore
            .map((e: Event) => {
              return (
                <MotionBox
                  key={e.id}
                  variants={item}
                  exit={{ opacity: 0, x: -40 }}
                  mt={4}
                >
                  <EventCard event={e} />
                </MotionBox>
              );
            })}
        </MotionBox>
      </Box>
    </>
  );
};

export { EventList };
