import {
  Box,
  FormLabel,
  Heading,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import React from "react";
import { InputField } from "./InputField";

interface Props {
  matchTimes: (e: any, values: any) => void;
  toggleCapacity: (values: any) => void;
  props: FormikProps<{
    title: string;
    description: any;
    location: string;
    capacity: string | number;
    startTime: string;
    endTime: string;
  }>;
  hasCapacity: boolean;
}

const EventFormEventDetails: React.FC<Props> = ({
  matchTimes,
  toggleCapacity,
  props,
  hasCapacity,
}) => {
  return (
    <>
      <Heading fontSize="x-large">Event info</Heading>
      <Text mb={4}>Pick the type of event you would like to create.</Text>
      <VStack align="stretch" spacing={6}>
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
        <Box>
          <FormLabel width="min" htmlFor="capacity">
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Text mr={2}>Capacity</Text>
              <Switch
                size="sm"
                isChecked={hasCapacity}
                onChange={() => toggleCapacity(props.values)}
                colorScheme="orange"
              />
            </Box>
          </FormLabel>

          <InputField
            hidden={!hasCapacity}
            name="capacity"
            type="number"
            min={0}
            width={20}
          />
        </Box>
      </VStack>
    </>
  );
};

export { EventFormEventDetails };
