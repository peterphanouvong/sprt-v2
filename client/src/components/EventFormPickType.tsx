import {
  Box,
  Heading,
  Text,
  useRadio,
  useRadioGroup,
  HStack,
  UseRadioProps,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SelectField } from "./SelectField";

interface Props {
  prevStep: () => void;
}

const EventFormPickType: React.FC<Props> = ({ prevStep }) => {
  const [selected, setSelected] = useState("public");

  const options = ["public", "private"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "event-type",
    defaultValue: selected,
    onChange: setSelected,
  });
  const group = getRootProps();

  return (
    <Box>
      <Heading fontSize="x-large">Who's can see this event?</Heading>
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
          <Text variant="meta">
            All of your followers will be able to see this event.
          </Text>
        ) : selected === "private" ? (
          <>
            {" "}
            <Text variant="meta">
              You can choose who gets to see this event.
            </Text>
            <Box mt={6}>
              <SelectField
                name="hello"
                isMulti
                placeholder=""
                label="Who's invited?"
                options={[
                  { value: "1", label: "Redfox" },
                  { value: "2", label: "Peter Phanouvong" },
                  { value: "3", label: "Tom Phanouvong" },
                  { value: "4", label: "Kevin Chau" },
                ]}
              />
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
      <HStack display="flex" justifyContent="flex-end" mt={6}>
        <Text variant="meta">Step 3 of 3</Text>
        <Button variant="ghost" colorScheme="gray" onClick={prevStep}>
          Go back
        </Button>
        <Button colorScheme="orange" type="submit">
          Create event
        </Button>
      </HStack>
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
