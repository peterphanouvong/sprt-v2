import { Heading } from "@chakra-ui/react";
import React from "react";

interface Props {}

const BasePageHeader: React.FC<Props> = ({ children }) => {
  return (
    <Heading
      as="h2"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      padding={6}
      variant="h2"
    >
      {children}
    </Heading>
  );
};

export { BasePageHeader };
