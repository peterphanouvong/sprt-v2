import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {}

const BasePage: React.FC<Props> = ({ children }) => {
  return (
    <Box
      minH="100vh"
      bgColor="gray.50"
      pt="107px"
      display="flex"
      flexDirection="column"
    >
      {children}
    </Box>
  );
};

export { BasePage };
