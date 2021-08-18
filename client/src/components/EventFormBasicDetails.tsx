import {
  VStack,
  Box,
  FormLabel,
  Switch,
  Text,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import React from "react";
import { DynamicEditor } from "./DynamicEditor";
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
  toggleDescription: (values: any) => void;
  hasDescription: boolean;
}

const EventFormBasicDetails: React.FC<Props> = ({
  matchTimes,
  toggleCapacity,
  props,
  hasCapacity,
  toggleDescription,
  hasDescription,
}) => {
  return (
    <>
      <Heading fontSize="x-large">Basic details</Heading>
      <Text mb={4} fontSize="sm">
        Fill out the important details for your event.
      </Text>

      <VStack align="stretch" spacing={6}>
        <InputField
          name="title"
          placeholder="what's it called?"
          label="Title"
          required
        />

        <InputField
          name="location"
          placeholder="where's it happening?"
          label="Location"
          required
        />
        <HStack spacing={4}>
          <InputField
            name="startTime"
            placeholder="when do I show up?"
            label="Start time"
            required
            type="datetime-local"
            onBlurCapture={(x) => matchTimes(x, props.values)}
          />

          <InputField
            name="endTime"
            placeholder="when do I leave?"
            label="End time"
            type="datetime-local"
            min={props.values.startTime}
          />
        </HStack>

        <Box>
          <FormLabel width="min" htmlFor="capacity">
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Text mr={2}>Capacity</Text>
              <Switch
                id="capacity"
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
            placeholder="how many peeps?"
            type="number"
            min={0}
          />
        </Box>

        <Box>
          <FormLabel width="min" htmlFor="description">
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Text mr={2}>Description</Text>
              <Switch
                id="description"
                size="sm"
                isChecked={hasDescription}
                onChange={() => toggleDescription(props.values)}
                colorScheme="orange"
              />
            </Box>
          </FormLabel>
          <DynamicEditor
            hidden={!hasDescription}
            setFieldValue={props.setFieldValue}
            name="description"
            initialValue={props.values.description}
          />
        </Box>
      </VStack>
    </>
  );
};

export { EventFormBasicDetails };
