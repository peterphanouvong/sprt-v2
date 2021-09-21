import { Button } from "@chakra-ui/button";
import { Box, VStack } from "@chakra-ui/layout";
import { FormLabel, useToast, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useJoinQuickEventMutation } from "../generated/graphql";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { InputField } from "./InputField";
import { UploadeCovidCertificate } from "./UploadeCovidCertificate";
interface Props {
  quickEventId: number;
}

const QuickEventSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid")
    .required("This field is required"),
  firstName: Yup.string()
    .trim("The first name cannot include leading and trailing spaces")
    .strict()
    .required("This field is required"),
  lastName: Yup.string()
    .trim("The last name cannot include leading and trailing spaces")
    .strict()
    .required("This field is required"),
});

const JoinQuickEventForm: React.FC<Props> = ({ quickEventId }) => {
  const [, joinQuickEvent] = useJoinQuickEventMutation();
  const toast = useToast();
  const isMobile = useIsMobileScreen();

  const [hasJoined, setHasJoined] = useState(
    !!localStorage.getItem(String(quickEventId))
  );
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        createdAt: new Date().toString(),
      }}
      validationSchema={QuickEventSchema}
      onSubmit={async (values) => {
        console.log(values);
        const { error } = await joinQuickEvent({
          joinQuickEventId: quickEventId,
          joinQuickEventInput: values,
        });

        if (error) {
          console.log(error);
          toast({
            description: error.message.substr(10),
            isClosable: true,
            position: "top",
            status: "error",
            variant: "subtle",
          });
        } else {
          toast({
            description: "You have joined this event",
            isClosable: true,
            position: "top",
            status: "success",
            variant: "subtle",
          });

          setHasJoined(true);
          localStorage.setItem(String(quickEventId), values.email);
        }
      }}
    >
      {(props) => (
        <Form>
          <VStack spacing={4} mt={4} alignItems="stretch">
            <InputField
              name="firstName"
              label="First name"
              touched={props.touched.firstName as boolean}
              required
              disabled={hasJoined}
            />
            <InputField
              name="lastName"
              label="Last name"
              touched={props.touched.lastName as boolean}
              required
              disabled={hasJoined}
            />
            <InputField
              name="email"
              label="Email"
              touched={props.touched.email as boolean}
              required
              disabled={hasJoined}
            />

            <Box>
              <FormLabel>
                <Text>Proof of vaccination</Text>
              </FormLabel>
              <UploadeCovidCertificate />
            </Box>

            <Button
              type={hasJoined ? "button" : "submit"}
              colorScheme={hasJoined ? "green" : "blue"}
              size={isMobile ? "md" : "lg"}
              isLoading={props.isSubmitting}
            >
              {hasJoined ? "You're in" : "Join event!"}
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export { JoinQuickEventForm };