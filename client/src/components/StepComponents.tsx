import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  nextStep?: () => void;
  prevStep?: () => void;
  final?: boolean;
}

export const PrevNextButtons: React.FC<Props> = ({
  nextStep,
  prevStep,
  final,
}) => {
  const previousIcon = useBreakpointValue({
    base: <ChevronLeftIcon />,
    sm: <ChevronUpIcon />,
    md: <ChevronLeftIcon />,
  });
  const nextIcon = useBreakpointValue({
    base: <ChevronRightIcon />,
    sm: <ChevronDownIcon />,
    md: <ChevronRightIcon />,
  });
  return (
    <ButtonGroup mt={8} display="flex" justifyContent="center" spacing={3}>
      <Tooltip label={"previous"} fontSize="md">
        <IconButton
          aria-label="previous"
          onClick={prevStep}
          isDisabled={!prevStep}
          icon={previousIcon}
          isRound={true}
        />
      </Tooltip>
      <Tooltip label={final ? "finish" : "next"} fontSize="md">
        <IconButton
          aria-label="next"
          colorScheme={final ? "brand" : "gray"}
          variant={final ? "outline" : "solid"}
          onClick={nextStep}
          isDisabled={!nextStep}
          icon={final ? <CheckIcon /> : nextIcon}
          isRound={true}
        />
      </Tooltip>
    </ButtonGroup>
  );
};
