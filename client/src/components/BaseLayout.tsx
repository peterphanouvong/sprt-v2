import { Box } from "@chakra-ui/react";
import React from "react";
import { BaseNavbar } from "./BaseNavbar";

interface Props {}

const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box maxWidth="1440px" margin="auto">
      <BaseNavbar />
      {children}
    </Box>
  );
};

export { BaseLayout };
