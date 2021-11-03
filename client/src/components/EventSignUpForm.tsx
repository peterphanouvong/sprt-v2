import { Button, Checkbox, Text, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useAttendeeQuery } from "../generated/graphql";
import { BaseInputField } from "./BaseInputField";

interface Props {
  eventId: number;
  isFull: boolean;
}

const EventSchema = Yup.object().shape({
  phone: Yup.string().required("This field is required"),
  firstName: Yup.string()
    .trim("The first name cannot include leading and trailing spaces")
    .strict()
    .required("This field is required"),
  lastName: Yup.string()
    .trim("The last name cannot include leading and trailing spaces")
    .strict()
    .required("This field is required"),
  beemId: Yup.string()
    .trim("The first name cannot include leading and trailing spaces")
    .strict()
    .required("This field is required"),
});

const EventSignUpForm: React.FC<Props> = ({ eventId, isFull }) => {
  console.log("isFull", isFull);
  console.log("eventId", eventId);

  const [{}] = useAttendeeQuery();
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phone: "",
        createdAt: new Date().toString(),
        beemId: "",
        status: "waitlist",
      }}
      validationSchema={EventSchema}
      onSubmit={async (values) => {}}
    >
      {(props) => (
        <Form>
          <VStack spacing={4} mt={4} alignItems="stretch">
            <BaseInputField
              name="firstName"
              label="First name"
              touched={props.touched.firstName as boolean}
              required
            />
            <BaseInputField
              name="lastName"
              label="Last name"
              touched={props.touched.lastName as boolean}
              required
            />
            <BaseInputField
              name="phone"
              label="Phone number"
              touched={props.touched.phone as boolean}
              required
            />
            <BaseInputField
              name="beemId"
              label="BeemID or PayID"
              touched={props.touched.phone as boolean}
              placeholder="@myBeemAccount"
              required
            />

            <Checkbox colorScheme="blue">
              <Text variant="body-2">I am fully vaccinated</Text>
            </Checkbox>

            <Button type="submit" isLoading={props.isSubmitting}>
              Join
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export { EventSignUpForm };
