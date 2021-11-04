import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

type Props = BoxProps & {
  footer?: React.FC;
};

const BaseCard: React.FC<Props> = ({ ...props }) => {
  const Footer = props.footer;
  const { padding, ...outer } = props;
  return (
    <Box
      borderRadius="sm"
      border="1px solid"
      bgColor="white"
      borderColor="gray.200"
      {...outer}
    >
      <Box padding={padding}>{props.children}</Box>

      {Footer ? <Footer /> : <></>}
    </Box>
  );
};

export { BaseCard };
