import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {}

const Card: React.FC<Props> = ({ children }) => {
  return (
    <Box
      shadow="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      padding={4}
    >
      {children}
    </Box>
  );
};

export { Card };
