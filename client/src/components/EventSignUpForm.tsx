import {
  Button,
  Checkbox,
  Flex,
  Switch,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  useAddNewAttendeeMutation,
  useAttendeeExistsMutation,
  useAddExistingAttendeeMutation,
} from "../generated/graphql";
import { BaseInputField } from "./BaseInputField";

interface Props {
  eventId: number;
  isFull: boolean;
  setHasSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
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
    .strict(),
  // .required("This field is required"),
});

const EventSignUpForm: React.FC<Props> = ({
  eventId,
  // isFull,
  setHasSignedUp,
}) => {
  const [, attendeeExists] = useAttendeeExistsMutation();
  const [, addNewAttendee] = useAddNewAttendeeMutation();
  const [, addExistingAttendee] = useAddExistingAttendeeMutation();
  const [isPayingCash, setIsPayingCash] = React.useState<boolean>(false);
  const toast = useToast();

  // console.log(isFull);

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phone: "",
        beemId: "",
        status: "waitlist",
        isPayingCash: false,
      }}
      validationSchema={EventSchema}
      onSubmit={async (values, actions) => {
        // console.log("values", values);
        const exists = await attendeeExists({ phoneNumber: values.phone });
        let res;

        if (exists.data?.attendeeExists !== -1) {
          console.log("this guy already exists in the db");
          res = await addExistingAttendee({
            eventId: eventId,
            attendeeId: exists.data?.attendeeExists!,
            isPayingCash: isPayingCash,
          });
        } else {
          res = await addNewAttendee({
            eventId: eventId,
            input: {
              firstname: values.firstName,
              lastname: values.lastName,
              beemId: values.beemId,
              phoneNumber: values.phone,
              isPayingCash: isPayingCash,
            },
          });
        }

        setHasSignedUp(true);
        localStorage.setItem(`event:${eventId}`, "true");
        if (res.error) {
          toast({
            description: "Something went wrong!",
            isClosable: true,
            position: "top",
            status: "error",
            variant: "subtle",
          });
        } else {
          toast({
            description: "Success!",
            isClosable: true,
            position: "top",
            status: "success",
            variant: "subtle",
          });

          actions.resetForm();
        }
      }}
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

            <Flex alignItems="center" py={2}>
              <Text fontWeight="medium" mr={2} variant="body-3">
                Paying by cash?
              </Text>

              <Switch
                id="isPayingCash"
                onChange={() => {
                  setIsPayingCash(!isPayingCash);
                }}
                colorScheme="brand"
              />
            </Flex>

            {!isPayingCash && (
              <BaseInputField
                name="beemId"
                label="BeemID or PayID"
                touched={props.touched.phone as boolean}
                placeholder="@myBeemAccount"
                required
              />
            )}

            <Checkbox colorScheme="brand">
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
