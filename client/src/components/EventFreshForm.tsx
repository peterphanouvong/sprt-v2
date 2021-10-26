import { Box, Button, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { parseRichText } from "../utils/parseRichText";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { BaseDynamicEditor } from "./BaseDynamicEditor";
import { BaseInputField } from "./BaseInputField";

interface Props {
  templateId?: string | undefined;
}

const EventFreshForm: React.FC<Props> = ({ templateId }) => {
  const isMobile = useIsMobileScreen();

  return (
    <Box flex={1}>
      <Formik
        initialValues={{
          title: "",
          description: parseRichText(""),
          capacity: undefined,
        }}
        onSubmit={(values) => {
          console.log(values);
          console.log("submit");
        }}
      >
        {(props) => (
          <Form>
            <VStack spacing={4} alignItems="stretch">
              <BaseInputField
                label="Title"
                name="title"
                touched={props.touched.title as boolean}
                required
              />

              <BaseInputField
                label="Capacity"
                name="capacity"
                touched={props.touched.capacity as boolean}
                type="number"
                width={20}
              />

              <BaseDynamicEditor
                label="Description"
                setFieldValue={props.setFieldValue}
                name="description"
                initialValue={props.values.description}
              />

              <Button
                isLoading={props.isSubmitting}
                size={isMobile ? "xs" : "lg"}
                type="submit"
              >
                Create event!
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export { EventFreshForm };
