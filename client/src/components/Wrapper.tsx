import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {
  variant?: "small" | "regular";
}

const Wrapper: React.FC<Props> = ({ variant, children }) => {
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

export { Wrapper };
