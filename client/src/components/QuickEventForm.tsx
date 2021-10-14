import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useCreateQuickEventMutation } from "../generated/graphql";
import { parseRichText } from "../utils/parseRichText";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { DynamicEditor } from "./DynamicEditor";
import { InputField } from "./InputField";

interface Props {}

const QuickEventForm: React.FC<Props> = ({}) => {
  const isMobile = useIsMobileScreen();
  const toast = useToast();
  const router = useRouter();

  const [, createQuickEvent] = useCreateQuickEventMutation();
  return (
    <Formik
      initialValues={{
        title: "",
        description: parseRichText(""),
        capacity: undefined,
      }}
      onSubmit={async (values) => {
        console.log(values);

        const { error, data } = await createQuickEvent({
          createQuickEventInput: {
            ...values,
            description: JSON.stringify(values.description),
          },
        });

        if (error) {
          toast({
            description: error.message.substr(10),
            isClosable: true,
            position: "top",
            status: "error",
            variant: "subtle",
          });
        } else {
          localStorage.setItem(`my-${data?.createQuickEvent.id}`, "true");
          router.push(`/quick-event/${data?.createQuickEvent.id}`);
        }
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

            {/* <TextareaField label="Description" name="description" /> */}
            <DynamicEditor
              label="Description"
              setFieldValue={props.setFieldValue}
              name="description"
              initialValue={props.values.description}
            />

            <Button
              isLoading={props.isSubmitting}
              size={isMobile ? "md" : "lg"}
              type="submit"
            >
              Create event!
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export { QuickEventForm };
