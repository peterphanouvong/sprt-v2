import React from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";

import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { BackButton } from "../components/BackButton";
import Logo from "../components/Logo";
import Head from "next/head";
// import FacebookLogin from "react-facebook-login";

interface Props {}

const Login: React.FC<Props> = ({}) => {
  const [{}, login] = useLoginMutation();

  const router = useRouter();
  return (
    <>
      <Head>
        <title>Log in | sprt</title>
      </Head>
      <Box>
        <Stack margin="auto" maxW={"500px"} padding={4}>
          <Box>
            <BackButton />
            <Box mt={6} />
            <Logo />
          </Box>
          <Heading variant="h1">Welcome back</Heading>
          <Text paddingBottom={6} variant="body-2">
            Let's get you signed in.
          </Text>
          <Formik
            initialValues={{ usernameOrEmail: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const res = await login({
                password: values.password,
                usernameOrEmail: values.usernameOrEmail,
              });
              if (res.data?.login.errors) {
                setErrors(toErrorMap(res.data.login.errors));
              } else if (res.data?.login.user) {
                console.log(res.data?.login.user);
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
                  <InputField
                    name="usernameOrEmail"
                    label="Username or Email"
                    placeholder="username or email"
                    touched={props.touched.usernameOrEmail as boolean}
                    required
                  />
                  <VStack spacing={1} alignItems="start">
                    <InputField
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="password"
                      touched={props.touched.password as boolean}
                      required
                    />
                    <NextLink href="/forgot-password">
                      <Link fontSize="sm" colorScheme="orange">
                        <Text variant="body-3">Forgot password?</Text>
                      </Link>
                    </NextLink>
                  </VStack>
                  <Button
                    colorScheme="orange"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Log in
                  </Button>

                  <Box>
                    <Text display="inline" variant="body-3">
                      Don't have an account yet?{" "}
                    </Text>
                    <NextLink href="/register">
                      <Link color="orange">
                        <Text display="inline" color="orange" variant="body-3">
                          Sign up.
                        </Text>
                      </Link>
                    </NextLink>
                  </Box>

                  {/* <FacebookLogin
                  appId='1088597931155576'
                  autoLoad={true}
                  fields='name,email,picture'
                  // onClick={componentClicked}
                  callback={responseFacebook}
                /> */}
                </VStack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
