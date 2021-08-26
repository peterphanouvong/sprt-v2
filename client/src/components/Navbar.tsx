import React from "react";
import NextLink from "next/link";
import { Box, Link, Stack, useColorMode } from "@chakra-ui/react";

import Logo from "./Logo";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import SettingsDrawer from "./SettingsDrawer";

import { useRouter } from "next/router";
interface Props {}

const Navbar: React.FC<Props> = ({}) => {
  const { colorMode } = useColorMode();
  const [, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({});
  const router = useRouter();
  console.log(router.pathname);

  let body: any = null;
  let left: any = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <Stack alignItems={"center"} direction={"row"} spacing={8}>
        <NextLink href="/login">
          <Link>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
        <SettingsDrawer />
      </Stack>
    );

    // user logged in
  } else {
    body = (
      <Stack alignItems={"center"} direction={"row"} spacing={8}>
        <NextLink href={`/${data.me.username}`}>
          <Link>{data.me.username}</Link>
        </NextLink>
        <Link
          onClick={() => {
            logout();
          }}
          // isloading={logoutFetching}
          variant="link"
          fontWeight="normal"
        >
          logout
        </Link>
        <SettingsDrawer />
      </Stack>
    );

    left = (
      <Stack
        alignItems={{ base: "left", md: "center" }}
        direction={"row"}
        spacing={8}
      >
        <NextLink href="/feed">
          <Link>feed</Link>
        </NextLink>
        <NextLink href="/clubs">
          <Link>clubs</Link>
        </NextLink>{" "}
        <NextLink href="/events">
          <Link
            px={2}
            py={1}
            borderBottom={
              router.pathname === "/events" ? "2px solid orange" : ""
            }
          >
            events
          </Link>
        </NextLink>
      </Stack>
    );
  }

  return (
    <>
      <Box
        paddingX={16}
        display="flex"
        justifyContent="space-between"
        alignItems={"center"}
        flexDirection={"row"}
        mb={8}
        position="sticky"
        top={0}
        zIndex="10"
        bg={colorMode === "dark" ? "gray.800" : `white`}
      >
        <Box display="flex" flexDirection={"row"} alignItems={"center"}>
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
    </>
  );
};

export { Navbar };
