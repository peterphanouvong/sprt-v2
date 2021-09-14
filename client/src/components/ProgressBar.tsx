import { Text, Box, Flex } from "@chakra-ui/react";
import React from "react";

interface ICircleTitle {
  index: number;
  length: number;
  variant?: "complete" | "active" | "incomplete";
  setIndex?: (step: number) => void;
}

const CircleTitle: React.FC<ICircleTitle> = ({
  variant = "incomplete",
  index,
  length,
  children,
  setIndex,
}) => {
  const borderColor = variant === "incomplete" ? "gray.300" : "brand.500";
  const backgroundColor =
    variant === "complete"
      ? "brand.500"
      : variant === "active"
      ? "white"
      : "gray.100";
  const labelTextColor =
    variant === "active"
      ? "brand.500"
      : variant === "incomplete"
      ? "gray.400"
      : "";
  const numberTextColor =
    variant === "complete"
      ? "white"
      : variant === "incomplete"
      ? "gray.500"
      : "brand.500";
  const barColor = variant !== "incomplete" ? "brand.500" : "gray.300";

  return (
    <Flex
      flex={1}
      position="relative"
      flexDir="column"
      alignItems="center"
      transition="0.2s ease"
      _before={
        index === 1
          ? {}
          : {
              transition: "0.5s ease",
              position: "absolute",
              content: '""',
              borderBottom: "2px solid",
              borderColor: barColor,
              width: "100%",
              top: "20px",
              left: "-50%",
              zIndex: 2,
            }
      }
      _after={
        index >= length
          ? {}
          : {
              transition: "0.5s ease",
              position: "absolute",
              content: '""',
              borderBottom: "2px solid",
              borderColor: barColor,
              width: "100%",
              top: "20px",
              left: "50%",
              zIndex: 2,
            }
      }
    >
      <Flex
        onClick={setIndex ? () => setIndex(index - 1) : () => {}}
        _hover={
          setIndex
            ? {
                cursor: "pointer",
              }
            : { cursor: "not-allowed" }
        }
        transition="0.2s ease"
        alignItems="center"
        justifyContent="center"
        width="40px"
        height="40px"
        border="2px solid"
        borderColor={borderColor}
        borderRadius="20px"
        position="relative"
        backgroundColor={backgroundColor}
        zIndex={5}
        color={numberTextColor}
      >
        <Text variant="body-3">{index}</Text>
      </Flex>

      <Text variant="label" transition="0.2s ease" color={labelTextColor}>
        {children}
      </Text>
    </Flex>
  );
};

interface Props {
  steps: string[];
  currentIndex: number;
  setIndex?: (step: number) => void;
}
const ProgressBar: React.FC<Props> = ({ steps, currentIndex, setIndex }) => {
  return (
    <>
      <Box
        mb="20px"
        mt="auto"
        display="flex"
        justifyContent="space-between"
        position="relative"
      >
        {steps.map((step, idx) => (
          <CircleTitle
            setIndex={setIndex}
            variant={
              idx < currentIndex
                ? "complete"
                : idx > currentIndex
                ? "incomplete"
                : "active"
            }
            index={idx + 1}
            length={steps.length}
          >
            {step}
          </CircleTitle>
        ))}
      </Box>
    </>
  );
};

export { ProgressBar };
