import { Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  display?: string;
}

const MetaDataText: React.FC<Props> = ({ children, display = "inline" }) => {
  return (
    <Text display={display} color="GrayText" fontSize="sm">
      {children}
    </Text>
  );
};

export { MetaDataText };
