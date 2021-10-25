import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {}

const BaseContent: React.FC<Props> = ({ children }) => {
  return <Box ml="20vw">{children}</Box>;
};

export { BaseContent };
