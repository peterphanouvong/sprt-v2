import React from "react";
import Image from "next/image";
import logo from "../images/uts.png";
import { Box } from "@chakra-ui/react";

interface Props {}

const ClubIcon: React.FC<Props> = ({}) => {
  return (
    <Box width={16} height={16} borderRadius={8} overflow="hidden">
      <Image width={60} height={60} src={logo} />
    </Box>
  );
};

export { ClubIcon };
