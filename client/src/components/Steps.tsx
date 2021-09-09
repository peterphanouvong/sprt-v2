import { Box } from "@chakra-ui/react";
import React from "react";
import { ProgressBar } from "./ProgressBar";

interface Props {
  activeStep: number;
  steps: string[];
  setStep?: (step: number) => void;
}

const Steps: React.FC<Props> = ({
  children,
  activeStep,
  steps,
  setStep = undefined,
}) => {
  const childArr = React.Children.toArray(children);
  // const stepCount = childArr.length;

  return (
    <Box>
      {/* <Progress size="sm" value={(activeStep / (stepCount - 1)) * 100} /> */}
      <ProgressBar setIndex={setStep} steps={steps} currentIndex={activeStep} />
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
