import React from "react";
import NextLink from "next/link";
import { Box, Button, HStack, Link, useColorMode } from "@chakra-ui/react";

import Logo from "./Logo";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import SettingsDrawer from "./SettingsDrawer";

interface Props {}

const Navbar: React.FC<Props> = ({}) => {
  const { colorMode } = useColorMode();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({});

  let body: any = null;
  let left: any = null;

  //data loading d
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <HStack spacing={8}>
        <NextLink href="/login">
          <Link>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
        <SettingsDrawer />
      </HStack>
    );

    // user logged in
  } else {
    body = (
      <HStack spacing={8}>
        <NextLink href="/">
          <Link>{data.me.username}</Link>
        </NextLink>
        <Button
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
          variant="link"
          fontWeight="normal"
        >
          logout
        </Button>
        <SettingsDrawer />
      </HStack>
    );

    left = (
      <HStack spacing={8}>
        <NextLink href="/clubs">
          <Link>clubs</Link>
        </NextLink>
        <NextLink href="/events">
          <Link>events</Link>
        </NextLink>
      </HStack>
    );
  }

  return (
    <Box
      paddingX={16}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottomColor="gray.200"
      boxShadow="sm"
      borderBottomWidth="1px"
      mb={8}
      position="sticky"
      top={0}
      zIndex="10"
      bg={colorMode === "dark" ? "gray.800" : `white`}
    >
      <Box display="flex" alignItems="center">
        <NextLink href="/home">
          <a style={{ paddingTop: "6px" }}>
            <Logo color={colorMode === "dark" ? "white" : "black"} />
          </a>
        </NextLink>
        <Box mr={4} />
        {left}
      </Box>
      {body}
    </Box>
  );
};

export { Navbar };
