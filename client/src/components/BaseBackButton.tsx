import { ChevronLeftIcon } from "@chakra-ui/icons";
import { ButtonProps, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type Props = ButtonProps;

const BaseBackButton: React.FC<Props> = ({ ...props }) => {
  const router = useRouter();
  return (
    <IconButton
      isRound={true}
      colorScheme="gray"
      variant="solid"
      aria-label="back-button"
      icon={<ChevronLeftIcon />}
      onClick={() => router.back()}
      {...props}
    />
  );
};

export { BaseBackButton };
