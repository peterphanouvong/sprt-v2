import React from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";

import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Logo from "../components/Logo";
import { BackButton } from "../components/BackButton";

interface Props {}

const Register: React.FC<Props> = ({}) => {
  const [{}, register] = useRegisterMutation();

  const router = useRouter();
  return (
    <Box margin="auto">
      <Stack margin="auto" maxW={"500px"} padding={4}>
        <Box>
          <BackButton />
          <Box mt={6} />
          <Logo />
        </Box>
        <Heading variant="h1">Sign up for free</Heading>
        <Text paddingBottom={6} variant="body-2">
          Yep, it's totally free! Let's get started.
        </Text>
        <Formik
          initialValues={{ username: "", password: "", email: "" }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values);
            const res = await register({ options: values });
            console.log(res);
            if (res.data?.register.errors) {
              setErrors(toErrorMap(res.data.register.errors));
            } else if (res.data?.register.user) {
              router.push("/home");
            }
          }}
        >
          {(props) => (
            <Form>
              <VStack spacing={4} align="stretch">
                <HStack spacing={4}>
                  <InputField
                    name="firstname"
                    label="First name"
                    placeholder="Matt"
                    touched={props.touched.username as boolean}
                    required
                  />
                  <InputField
                    name="lastname"
                    label="Last name"
                    placeholder="Anderson"
                    touched={props.touched.username as boolean}
                    required
                  />
                </HStack>

                <InputField
                  name="username"
                  label="Username"
                  placeholder="captain_america123"
                  touched={props.touched.username as boolean}
                  required
                />
                <InputField
                  name="email"
                  label="Email"
                  placeholder="matt@email.com"
                  type="email"
                  touched={props.touched.email as boolean}
                  required
                />
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;"
                  touched={props.touched.password as boolean}
                  required
                />

                <Checkbox colorScheme="orange">
                  <Text display="inline" variant="body-3">
                    I have read and agree to the{" "}
                  </Text>
                  <Link color="orange" href="#">
                    <Text display="inline" variant="body-3">
                      Terms of Service.
                    </Text>
                  </Link>
                </Checkbox>
                <Button
                  colorScheme="orange"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Sign up
                </Button>

                <Box>
                  <Text display="inline" variant="body-3">
                    Already have an account?{" "}
                  </Text>
                  <NextLink href="/login">
                    <Link color="orange">
                      <Text display="inline" color="orange" variant="body-3">
                        Login.
                      </Text>
                    </Link>
                  </NextLink>
                </Box>
              </VStack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
