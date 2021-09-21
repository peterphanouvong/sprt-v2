import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { BackButton } from "../components/BackButton";
import Logo from "../components/Logo";
import { RegisterForm } from "../components/RegisterForm";
import { createUrqlClient } from "../utils/createUrqlClient";

interface Props {}

const Register: React.FC<Props> = ({}) => {
  return (
    <>
      <Head>
        <title>Sign Up | sprt</title>
      </Head>
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
          <RegisterForm />
        </Stack>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
