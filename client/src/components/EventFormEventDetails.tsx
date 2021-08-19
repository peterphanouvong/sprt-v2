import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { FormikProps } from "formik";
import React from "react";
import { InputField } from "./InputField";

interface Props {
  matchTimes: (e: any, values: any) => void;
  props: FormikProps<{
    title: string;
    description: any;
    location: string;
    capacity: string | number;
    startTime: string;
    endTime: string;
  }>;
  prevStep: () => void;
  nextStep: () => void;
}

const EventFormEventDetails: React.FC<Props> = ({
  matchTimes,
  props,
  prevStep,
  nextStep,
}) => {
  return (
    <>
      <Heading fontSize="x-large">Event info</Heading>
      <Text mb={4}>Pick the type of event you would like to create.</Text>

      <VStack align="stretch" spacing={4}>
        <InputField name="location" label="Location" width="md" required />
        <InputField
          name="startTime"
          label="Start time"
          required
          type="datetime-local"
          width="x-small"
          onBlurCapture={(x) => matchTimes(x, props.values)}
        />
        <InputField
          name="endTime"
          label="End time"
          width="x-small"
          type="datetime-local"
          min={props.values.startTime}
        />

        <InputField
          label="Capacity"
          name="capacity"
          type="number"
          min={0}
          width={20}
        />

        <HStack display="flex" justifyContent="flex-end" mt={6}>
          <Text variant="meta">Step 2 of 3</Text>
          <Button variant="ghost" colorScheme="gray" onClick={prevStep}>
            Go back
          </Button>
          <Button colorScheme="orange" onClick={nextStep}>
            Continue
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export { EventFormEventDetails };
