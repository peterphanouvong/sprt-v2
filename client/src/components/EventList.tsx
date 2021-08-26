import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { Event } from "../generated/graphql";
import { EventCard } from "./EventCard";
import { MotionBox } from "./MotionBox";

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
}

const EventList: React.FC<Props> = ({ events }) => {
  return (
    <>
      <VStack spacing={4} align="stretch">
        <MotionBox variants={container} initial="hidden" animate="show">
          {events
            .sort((a: any, b: any) => b.updatedAt - a.updatedAt)
            //@ts-ignore
            .map((e: Event) => {
              return (
                <MotionBox variants={item} mt={4}>
                  <EventCard event={e} key={e.id} />
                </MotionBox>
              );
            })}
        </MotionBox>
      </VStack>
    </>
  );
};

export { EventList };
