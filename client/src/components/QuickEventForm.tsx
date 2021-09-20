import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";

interface Props {}

const QuickEventForm: React.FC<Props> = ({}) => {
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        capacity: "",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(props) => (
        <Form>
          <VStack spacing={4} mt={8} alignItems="stretch">
            <InputField
              label="Title"
              name="title"
              touched={props.touched.title as boolean}
              required
            />

            <InputField
              label="Capacity"
              name="capacity"
              touched={props.touched.capacity as boolean}
              type="number"
              width={20}
            />

            <TextareaField label="Description" name="description" />

            <Button type="submit">Create event!</Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export { QuickEventForm };
