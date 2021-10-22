import {
  VStack,
  HStack,
  Checkbox,
  Link,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { toErrorMap } from "../utils/toErrorMap";
import { BaseInputField } from "./BaseInputField";
import * as Yup from "yup";
import { useRegisterMutation } from "../generated/graphql";
import NextLink from "next/link";
import { useRouter } from "next/router";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid")
    .required("This field is required"),
  username: Yup.string()
    .trim("The username cannot include leading and trailing spaces")
    .strict()
    .required("This field is required"),
  firstname: Yup.string()
    .trim("The first name cannot include leading and trailing spaces")
    .strict()
    .required("This field is required"),
  lastname: Yup.string()
    .trim("The last name cannot include leading and trailing spaces")
    .strict()
    .required("This field is required"),
});

interface Props {
  onSubmit?: () => void;
}

const RegisterForm: React.FC<Props> = ({ onSubmit }) => {
  const [{}, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Formik
      validationSchema={RegisterSchema}
      initialValues={{
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: "",
      }}
      onSubmit={
        onSubmit
          ? onSubmit
          : async (values, { setErrors }) => {
              const res = await register({ options: values });
              if (res.data?.register.errors) {
                setErrors(toErrorMap(res.data.register.errors));
              } else if (res.data?.register.user) {
                router.push("/feed");
              }
            }
      }
    >
      {(props) => (
        <Form>
          <VStack spacing={4} align="stretch">
            <HStack alignItems="start" spacing={4}>
              <BaseInputField
                name="firstname"
                label="First name"
                placeholder="Matt"
                touched={props.touched.firstname as boolean}
                required
              />
              <BaseInputField
                name="lastname"
                label="Last name"
                placeholder="Anderson"
                touched={props.touched.lastname as boolean}
                required
              />
            </HStack>

            <BaseInputField
              name="username"
              label="Username"
              placeholder="captain_america123"
              touched={props.touched.username as boolean}
              required
            />
            <BaseInputField
              name="email"
              label="Email"
              placeholder="matt@email.com"
              type="email"
              touched={props.touched.email as boolean}
              required
            />
            <BaseInputField
              name="password"
              label="Password"
              type="password"
              placeholder="&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;"
              touched={props.touched.password as boolean}
              required
            />

            <Checkbox>
              <Text display="inline" variant="body-3">
                I have read and agree to the{" "}
              </Text>
              <Link color="brand" href="#">
                <Text display="inline" variant="body-3">
                  Terms of Service.
                </Text>
              </Link>
            </Checkbox>
            <Button isLoading={props.isSubmitting} type="submit">
              Sign up
            </Button>

            <Box>
              <Text display="inline" variant="body-3">
                Already have an account?{" "}
              </Text>
              <NextLink href="/login">
                <Link color="brand">
                  <Text display="inline" color="brand" variant="body-3">
                    Login.
                  </Text>
                </Link>
              </NextLink>
            </Box>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export { RegisterForm };
