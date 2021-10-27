import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

type Props = BoxProps;

const BaseCard: React.FC<Props> = ({ ...props }) => {
  return (
    <Box
      borderRadius="sm"
      border="1px solid"
      bgColor="gray.50"
      borderColor="gray.200"
      padding={2}
      {...props}
    ></Box>
  );
};

export { BaseCard };
