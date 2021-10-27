import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {}

const BasePage: React.FC<Props> = ({ children }) => {
  return <Box ml="20vw">{children}</Box>;
};

export { BasePage };
