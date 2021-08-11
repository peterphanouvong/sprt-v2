import React from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";

import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface Props {}

const Register: React.FC<Props> = ({}) => {
  const [{}, register] = useRegisterMutation();

  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Heading as="h1" fontSize="x-large" mb={4}>
        Register
      </Heading>
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const res = await register({ options: values });
          console.log(res);
          if (res.data?.register.errors) {
            setErrors(toErrorMap(res.data.register.errors));
          } else if (res.data.register.user) {
            router.push("/home");
          }
        }}
      >
        {(props) => (
          <Form>
            <VStack spacing={4} align="stretch">
              <InputField
                name="username"
                label="Username"
                placeholder="username"
              />
              <InputField
                name="email"
                label="Email"
                placeholder="email"
                type="email"
              />
              <InputField
                name="password"
                label="Password"
                type="password"
                placeholder="password"
              />
              <VStack align="stretch">
                <Button
                  colorScheme="orange"
                  isLoading={props.isSubmitting}
                  type="submit"
                  width=""
                >
                  Register
                </Button>
                <HStack
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Divider orientation="horizontal" />
                  <Text color="gray.400">or</Text>
                  <Divider orientation="horizontal" />
                </HStack>
                <NextLink href="/login">
                  <Button colorScheme="orange" variant="outline">
                    Log in
                  </Button>
                </NextLink>
              </VStack>
            </VStack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
