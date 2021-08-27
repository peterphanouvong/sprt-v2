import { VStack, Text, Heading, Button, HStack } from "@chakra-ui/react";
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
    creatorTypeId: number;
    publicityTypeId: number;
    clubId: number | null;
  }>;
  onClose: () => void;
  nextStep: () => void;
}

const EventFormBasicDetails: React.FC<Props> = ({
  props,
  onClose,
  nextStep,
}) => {
  return (
    <>
      <Heading fontSize="x-large">Basic info</Heading>
      <Text mb={4} fontSize="sm">
        Let's get started building your event!
      </Text>

      <VStack align="stretch" spacing={4}>
        <InputField
          name="title"
          label="Title"
          width="sm"
          required
          touched={props.touched.title as boolean}
        />

        <DynamicEditor
          label="Description"
          setFieldValue={props.setFieldValue}
          name="description"
          initialValue={props.values.description}
        />

        <HStack display="flex" justifyContent="flex-end" mt={6}>
          <Text variant="meta">Step 1 of 3</Text>
          <Button variant="ghost" colorScheme="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="brand"
            disabled={props.values.title === ""}
            onClick={nextStep}
          >
            Continue
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export { EventFormBasicDetails };
