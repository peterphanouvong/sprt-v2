import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";
import { BaseContainer } from "./BaseContainer";

type Props = BoxProps;

const BaseContent: React.FC<Props> = ({ ...props }) => {
  return (
    <Box
      bgColor="white"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      {...props}
    >
      <BaseContainer padding={4}>{props.children}</BaseContainer>
    </Box>
  );
};

export { BaseContent };
