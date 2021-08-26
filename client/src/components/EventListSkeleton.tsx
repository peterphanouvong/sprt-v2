import { Skeleton } from "@chakra-ui/react";
import React from "react";

interface Props {}

const EventListSkeleton: React.FC<Props> = ({}) => {
  return (
    <>
      <Skeleton mt={4} width="100%" height="240px" borderRadius="lg" />
      <Skeleton mt={4} width="100%" height="240px" borderRadius="lg" />
      <Skeleton mt={4} width="100%" height="240px" borderRadius="lg" />
      <Skeleton mt={4} width="100%" height="240px" borderRadius="lg" />
    </>
  );
};

export { EventListSkeleton };
