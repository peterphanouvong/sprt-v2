import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { BaseLogo } from "../components/BaseLogo";
import { RegisterForm } from "../components/RegisterForm";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import NextLink from "next/link";

interface Props {}

const Register: React.FC<Props> = ({}) => {
  const isMobile = useIsMobileScreen();
  return (
    <>
      <Head>
        <title>Sign Up | sprt</title>
      </Head>
      <Box height="100vh" display="flex">
        <Box flex={2}>
          <Stack margin="auto" mt="20%" maxW={"500px"} padding={4}>
            <Box>
              <Box mt={6} />
              <NextLink href="/">
                <a>
                  <BaseLogo size="sm" />
                </a>
              </NextLink>
            </Box>
            <Heading variant="h1">Sign up for free</Heading>
            <Text paddingBottom={6} variant="body-2">
              Yep, it's totally free! Let's get started.
            </Text>
            <RegisterForm />
          </Stack>
        </Box>
        <Box hidden={isMobile} flex={3} bg="brand.500"></Box>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
