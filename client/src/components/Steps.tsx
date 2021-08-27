import { Box, Progress } from "@chakra-ui/react";
import React from "react";

interface Props {
  activeStep: number;
}

const Steps: React.FC<Props> = ({ children, activeStep }) => {
  const childArr = React.Children.toArray(children);
  const stepCount = childArr.length;

  return (
    <Box>
      <Progress
        size="sm"
        value={(activeStep / (stepCount - 1)) * 100}
        colorScheme="brand"
      />
      {childArr.map((child, index) => {
        return (
          <Box hidden={index !== activeStep} key={index}>
            {child}
          </Box>
        );
      })}
    </Box>
  );
};

export { Steps };
