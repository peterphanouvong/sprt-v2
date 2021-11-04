import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

type Props = BoxProps & {};

const BaseContainer: React.FC<Props> = ({ ...props }) => {
  return (
    <Box {...props} margin="auto" maxW="container.lg">
      {props.children}
    </Box>
  );
};

export { BaseContainer };
