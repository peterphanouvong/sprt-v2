import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

type Props = BoxProps;

const BaseContent: React.FC<Props> = ({ children }) => {
  return <Box padding={6}>{children}</Box>;
};

export { BaseContent };
