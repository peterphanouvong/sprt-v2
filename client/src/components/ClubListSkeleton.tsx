import { Skeleton } from "@chakra-ui/react";
import React from "react";

interface Props {}

const ClubListSkeleton: React.FC<Props> = ({}) => {
  return (
    <>
      <Skeleton mt={4} width="100%" height="260px" borderRadius="lg" />
      <Skeleton mt={4} width="100%" height="230px" borderRadius="lg" />
      <Skeleton mt={4} width="100%" height="250px" borderRadius="lg" />
      <Skeleton mt={4} width="100%" height="240px" borderRadius="lg" />
    </>
  );
};

export { ClubListSkeleton };
