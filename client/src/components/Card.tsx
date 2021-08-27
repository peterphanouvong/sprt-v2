import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

type Props = BoxProps;

const Card: React.FC<Props> = ({ children, onClick, ...props }) => {
  const [cardStyle, setCardStyle] = useState<{
    backgroundColor: string;
    shadow: string;
  }>({ backgroundColor: "", shadow: "md" });
  return (
    <Box
      onClick={onClick}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      padding={4}
      shadow={!!onClick ? cardStyle.shadow : "md"}
      backgroundColor={!!onClick ? cardStyle.backgroundColor : ""}
      onTouchStartCapture={
        !!onClick
          ? () => setCardStyle({ backgroundColor: "gray.50", shadow: "sm" })
          : () => {}
      }
      onTouchEnd={
        !!onClick
          ? () => setCardStyle({ backgroundColor: "", shadow: "md" })
          : () => {}
      }
      {...props}
    >
      {children}
    </Box>
  );
};

export { Card };
