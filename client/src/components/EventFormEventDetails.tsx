import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { FormikProps } from "formik";
import React from "react";
import { InputField } from "./InputField";

interface Props {
  props: FormikProps<{
    title: string;
    description: any;
    location: string;
    capacity: string | number;
    startTime: string;
    endTime: string;
    creatorTypeId: number;
    publicityTypeId: number;
    clubId: number | null;
  }>;
  prevStep: () => void;
  nextStep: () => void;
}

const EventFormEventDetails: React.FC<Props> = ({
  props,
  prevStep,
  nextStep,
}) => {
  return (
    <>
      <Heading fontSize="x-large">Event info</Heading>
      <Text mb={4}>Pick the type of event you would like to create.</Text>

      <VStack align="stretch" spacing={4}>
        <InputField
          name="location"
          label="Location"
          width="md"
          touched={props.touched.location as boolean}
          required
        />
        <InputField
          name="startTime"
          label="Start time"
          required
          type="datetime-local"
          width="x-small"
          touched={props.touched.startTime as boolean}
        />
        <InputField
          name="endTime"
          label="End time"
          width="x-small"
          type="datetime-local"
          touched={props.touched.endTime as boolean}
        />

        <InputField
          label="Capacity"
          name="capacity"
          type="number"
          min={0}
          width={20}
          touched={props.touched.capacity as boolean}
        />

        <HStack display="flex" justifyContent="flex-end" mt={6}>
          <Text variant="meta">Step 2 of 3</Text>
          <Button variant="ghost" colorScheme="gray" onClick={prevStep}>
            Go back
          </Button>
          <Button
            colorScheme="orange"
            disabled={
              !!props.errors.location ||
              !!props.errors.startTime ||
              !!props.errors.endTime ||
              !!props.errors.capacity
            }
            onClick={nextStep}
          >
            Continue
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export { EventFormEventDetails };
