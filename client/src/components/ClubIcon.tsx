import React from "react";
import Image from "next/image";
import logo from "../images/uts.png";
import { Box } from "@chakra-ui/react";

interface Props {}

const ClubIcon: React.FC<Props> = ({}) => {
  return (
    <Box width={8} height={8} borderRadius={8} overflow="hidden">
      <Image width={32} height={32} src={logo} />
    </Box>
  );
};

export { ClubIcon };
