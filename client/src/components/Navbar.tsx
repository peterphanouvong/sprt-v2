import React from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import Logo from "./Logo";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import SettingsDrawer from "./SettingsDrawer";
import { EventCreateButton } from "./EventCreateButton";
import { HamburgerIcon } from "@chakra-ui/icons";

interface Props {}

const Navbar: React.FC<Props> = ({}) => {
  const { colorMode } = useColorMode();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hidden = useBreakpointValue({ base: true, md: false });

  let body: any = null;
  let left: any = null;

  //data loading d
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <Stack
        alignItems={{ base: "left", md: "center" }}
        direction={{ base: "column", md: "row" }}
        spacing={8}
      >
        <NextLink href='/login'>
          <Link>login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link>register</Link>
        </NextLink>
        <SettingsDrawer />
      </Stack>
    );

    // user logged in
  } else {
    body = (
      <Stack
        alignItems={{ base: "left", md: "center" }}
        direction={{ base: "column", md: "row" }}
        spacing={8}
      >
        <NextLink href={`/${data.me.username}`}>
          <Link>{data.me.username}</Link>
        </NextLink>
        <Link
          onClick={() => {
            logout();
          }}
          // isloading={logoutFetching}
          variant='link'
          fontWeight='normal'
        >
          logout
        </Link>
        <SettingsDrawer />
      </Stack>
    );

    left = (
      <Stack
        alignItems={{ base: "left", md: "center" }}
        direction={{ base: "column", md: "row" }}
        spacing={8}
      >
        <NextLink href='/feed'>
          <Link>feed</Link>
        </NextLink>
        <NextLink href='/clubs'>
          <Link>clubs</Link>
        </NextLink>{" "}
        <NextLink href='/events'>
          <Link>events</Link>
        </NextLink>
        {/* <EventCreateButton /> */}
      </Stack>
    );
  }

  if (hidden)
    return (
      <>
        <IconButton
          icon={<HamburgerIcon />}
          onClick={onOpen}
          variant='ghost'
          aria-label='menu'
          my={2}
          mx={2}
        />

        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody>
              <NextLink href='/home'>
                <a style={{ paddingTop: "6px" }}>
                  <Logo color={colorMode === "dark" ? "white" : "black"} />
                </a>
              </NextLink>
              <Box mb={4} />
              {left}
              <Box mb={8} />
              {body}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  return (
    <>
      <Box
        paddingX={16}
        display='flex'
        justifyContent='space-between'
        alignItems={{ base: "left", md: "center" }}
        flexDirection={{ base: "column", md: "row" }}
        // borderBottomColor  ="gray.200"
        // boxShadow="md"
        // borderBottomWidth="1px"
        mb={8}
        position='sticky'
        top={0}
        zIndex='10'
        bg={colorMode === "dark" ? "gray.800" : `white`}
        // hidden={hidden}
      >
        <Box
          display='flex'
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "left", md: "center" }}
        >
          <NextLink href='/home'>
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
