import { Container } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "./Navbar";

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxW="container.xl">{children}</Container>
    </>
  );
};

export { Layout };
