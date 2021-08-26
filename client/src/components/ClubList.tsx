import React from "react";
import { Club } from "../generated/graphql";
import { ClubListItem } from "./ClubListItem";
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
  clubs: Club[];
}

const ClubList: React.FC<Props> = ({ clubs }) => {
  console.log(clubs);
  return (
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
