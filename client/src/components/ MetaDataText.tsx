import { Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  display?: string;
  color?: string;
}

const MetaDataText: React.FC<Props> = ({
  children,
  display = "inline",
  color = "GrayText",
}) => {
  return (
    <Text display={display} color={color} fontSize="sm">
      {children}
    </Text>
  );
};

export { MetaDataText };
