import { Heading } from "@chakra-ui/react";
import React from "react";
import { BaseContainer } from "./BaseContainer";

interface Props {}

const BasePageHeader: React.FC<Props> = ({ children }) => {
  return (
    <Heading
      as="h2"
      fontWeight="medium"
      bgColor="white"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      padding={6}
      variant="h2"
    >
      <BaseContainer padding={4}>{children}</BaseContainer>
    </Heading>
  );
};

export { BasePageHeader };
