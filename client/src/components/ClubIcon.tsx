import React from "react";
import Image from "next/image";
import logo from "../images/uts.png";
import { Box } from "@chakra-ui/react";

interface Props {}

const ClubIcon: React.FC<Props> = ({}) => {
  return (
    <Box width={20} height={20} borderRadius={8} overflow="hidden">
      <Image width={80} height={80} src={logo} />
    </Box>
  );
};

export { ClubIcon };
