import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

type Props = {
  variant?: "small" | "regular";
} & BoxProps;

const BaseWrapper: React.FC<Props> = ({ variant, children }) => {
  return (
    <Box
      maxW={variant === "regular" ? "800px" : "400px"}
      mx="auto"
      w="100%"
      mt={8}
    >
      {children}
    </Box>
  );
};

export { BaseWrapper };
