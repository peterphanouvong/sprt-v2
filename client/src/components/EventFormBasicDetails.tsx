import {
  VStack,
  Box,
  FormLabel,
  Switch,
  Text,
  Heading,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import React from "react";
import { DynamicEditor } from "./DynamicEditor";
import { InputField } from "./InputField";

interface Props {
  props: FormikProps<{
    title: string;
    description: any;
    location: string;
    capacity: string | number;
    startTime: string;
    endTime: string;
  }>;
  toggleDescription: (values: any) => void;
  hasDescription: boolean;
}

const EventFormBasicDetails: React.FC<Props> = ({
  props,
  toggleDescription,
  hasDescription,
}) => {
  return (
    <>
      <Heading fontSize="x-large">Basic info</Heading>
      <Text mb={4} fontSize="sm">
        Let's get started building your event!
      </Text>

      <VStack align="stretch" spacing={6}>
        <InputField name="title" label="Title" width="sm" required />

        <Box>
          <FormLabel width="min" htmlFor="description">
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Text mr={2}>Description</Text>
              <Switch
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
