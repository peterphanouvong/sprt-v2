import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Head from "next/head";

const Index = () => {
  const headingSize = useBreakpointValue({
    base: "2xl",
    sm: "2xl",
    md: "3xl",
    lg: "4xl",
  });
  const textSize = useBreakpointValue({
    base: "lg",
    sm: "xl",
    md: "xl",
    lg: "2xl",
  });
  const buttonSize = useBreakpointValue({
    base: "md",
    sm: "md",
    md: "md",
    lg: "lg",
  });
  const textAlignment = useBreakpointValue({
    base: "left",
    sm: "center",
    md: "center",
  });
  return (
    <>
      <Head>
        <title>sprt | Organise Sporting Events</title>
      </Head>
      <Layout>
        <Center mt={"15%"}>
          <Box
            maxW="64rem"
            display="flex"
            flexDirection="column"
            alignItems={textAlignment}
            // @ts-ignore
            textAlign={textAlignment}
          >
            <Heading size={headingSize}>
              Organising sporting events made a whole lot easier
            </Heading>
            <Text maxW={"48rem"} mt={8} fontSize={textSize}>
              Take the hassle out of creating events and managing your
              attendees.
            </Text>
            <NextLink href="/register">
              <Button mt={8} size={buttonSize}>
                Get started for free
              </Button>
            </NextLink>
          </Box>
        </Center>
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
