import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { LoginForm } from "../components/LoginForm";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";

interface Props {}

const Login: React.FC<Props> = ({}) => {
  const isMobile = useIsMobileScreen();
  return (
    <>
      <Head>
        <title>Log in | sprt</title>
      </Head>
      <Box height="100vh" display="flex">
        <Box flex={2} pos="relative">
          <LoginForm />
        </Box>
        <Box hidden={isMobile} flex={3} bg="brand.500"></Box>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
