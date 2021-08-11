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

  let body = null;

  //data loading d
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <HStack spacing={8}>
        <NextLink href="/login">
          <Link>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
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
          Logout
        </Button>
        <SettingsDrawer />
      </HStack>
    );
  }

  return (
    <Box
      paddingX={16}
      paddingY={2}
      display="flex"
      justifyContent="space-between"
      borderBottomColor="gray.200"
      boxShadow="sm"
      borderBottomWidth="1px"
      mb={8}
      position="sticky"
      top={0}
      // bg="rgba(255,255,255, 0.95)"
      zIndex="10"
    >
      <NextLink href="/home">
        <a>
          <Logo color={colorMode === "dark" ? "white" : "black"} />
        </a>
      </NextLink>
      {body}
    </Box>
  );
};

export { Navbar };
