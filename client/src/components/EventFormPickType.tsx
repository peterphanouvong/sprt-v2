import {
  Box,
  Heading,
  Text,
  useRadio,
  useRadioGroup,
  HStack,
  UseRadioProps,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {}

const EventFormPickType: React.FC<Props> = () => {
  const [selected, setSelected] = useState("");

  const options = ["public", "club", "custom"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "event-type",
    defaultValue: "public",
    onChange: setSelected,
  });
  const group = getRootProps();

  return (
    <Box>
      <Heading fontSize="x-large">Who's invited?</Heading>
      <Text mb={4}>Choose who gets to see this event.</Text>
      <HStack
        justifyContent={{ base: "flex-start", sm: "center", md: "flex-start" }}
        spacing={4}
        {...group}
      >
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>
      <Box mt={4}>
        {selected === "public" ? (
          <Text variant="meta">Everyone will be able to see this event.</Text>
        ) : selected === "club" ? (
          <Text variant="meta">
            Only the people in your club will be able to see this event.
          </Text>
        ) : (
          <Text variant="meta">You can choose who gets to see this event.</Text>
        )}
      </Box>
    </Box>
  );
};

const RadioCard: React.FC<UseRadioProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="sm"
        _checked={{
          bg: "orange.500",
          color: "white",
          borderColor: "orange.500",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={4}
        py={2}
        marginTop={2}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export { EventFormPickType };
