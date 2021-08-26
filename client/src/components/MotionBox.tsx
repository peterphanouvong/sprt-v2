import React from "react";
import { Box, BoxProps } from "@chakra-ui/layout";
import { motion, MotionProps } from "framer-motion";

const Boxx = motion<BoxProps>(Box);

type Props = BoxProps & MotionProps;

const MotionBox: React.FC<Props> = ({ children, ...props }) => {
  return <Boxx {...props}>{children}</Boxx>;
};

export { MotionBox };
