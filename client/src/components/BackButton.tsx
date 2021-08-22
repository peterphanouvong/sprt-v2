import { ChevronLeftIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface Props {}

const BackButton: React.FC<Props> = ({}) => {
  const router = useRouter();
  return (
    <IconButton
      isRound={true}
      aria-label="back-button"
      icon={<ChevronLeftIcon />}
      onClick={() => router.back()}
    />
  );
};

export { BackButton };
