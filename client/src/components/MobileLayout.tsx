import { BoxProps, Container } from "@chakra-ui/layout";
import React from "react";

type Props = BoxProps;

const MobileLayout: React.FC<Props> = (props) => {
  return (
    <Container {...props} maxW="lg" padding={6}>
      {props.children}
    </Container>
  );
};

export { MobileLayout };
