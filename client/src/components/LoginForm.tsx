import {
  Stack,
  Box,
  Heading,
  VStack,
  Link,
  Button,
  Text,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { toErrorMap } from "../utils/toErrorMap";
import { BaseInputField } from "./BaseInputField";
import { BaseLogo } from "./BaseLogo";
import NextLink from "next/link";
import { useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";

interface Props {}

const LoginForm: React.FC<Props> = ({}) => {
  const [, login] = useLoginMutation();

  const router = useRouter();

  return (
    <Stack margin="auto" mt="20%" maxW={"500px"} padding={4}>
      <Box>
        <Box mt={6} />
        <NextLink href="/">
          <a>
            <BaseLogo size="sm" />
          </a>
        </NextLink>
      </Box>
      <Heading variant="h1">Welcome back</Heading>
      <Text paddingBottom={6} variant="body-2">
        Let's get you signed in.
      </Text>
      <Formik
        initialValues={{ clubNameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await login({
            password: values.password,
            clubNameOrEmail: values.clubNameOrEmail,
          });
          if (res.data?.login.errors) {
            setErrors(toErrorMap(res.data.login.errors));
          } else if (res.data?.login.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.push("/home");
            }
          }
        }}
      >
        {(props) => (
          <Form>
            <VStack spacing={4} align="stretch">
              <BaseInputField
                name="clubNameOrEmail"
                label="Username or Email"
                placeholder="username or email"
                touched={props.touched.clubNameOrEmail as boolean}
                required
              />
              <VStack spacing={1} alignItems="start">
                <BaseInputField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="password"
                  touched={props.touched.password as boolean}
                  required
                />
                <NextLink href="/forgot-password">
                  <Link fontSize="sm">
                    <Text color="brand.500" variant="body-3">
                      Forgot password?
                    </Text>
                  </Link>
                </NextLink>
              </VStack>
              <Button isLoading={props.isSubmitting} type="submit">
                login
              </Button>

              <Box>
                <Text display="inline" variant="body-3">
                  Don't have an account yet?{" "}
                </Text>
                <NextLink href="/register">
                  <Link>
                    <Text display="inline" color="brand.500" variant="body-3">
                      Sign up.
                    </Text>
                  </Link>
                </NextLink>
              </Box>
            </VStack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export { LoginForm };
