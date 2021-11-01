import { Box, BoxProps, Heading } from "@chakra-ui/react";
import React from "react";

type Props = {
  title: string;
} & BoxProps;

const BaseSection: React.FC<Props> = (props) => {
  return (
    <Box {...props}>
      <Heading as="h6" mb={4} variant="h6">
        {props.title}
      </Heading>
      {props.children}
    </Box>
  );
};

export { BaseSection };
