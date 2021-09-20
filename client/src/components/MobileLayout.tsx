import { Container } from "@chakra-ui/layout";
import React from "react";

interface Props {}

const MobileLayout: React.FC<Props> = ({ children }) => {
  return (
    <Container maxW="lg" padding={4}>
      {children}
    </Container>
  );
};

export { MobileLayout };
