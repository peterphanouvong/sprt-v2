import { Button, ButtonGroup } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsFileEarmarkPlus, BsPlus } from "react-icons/bs";
import { useLogoutMutation } from "../generated/graphql";
import { useIsLoggedIn } from "../utils/useIsLoggedIn";

interface Props {}

const BaseNavbar: React.FC<Props> = ({}) => {
  const [, logout] = useLogoutMutation();

  const router = useRouter();

  const isLoggedIn = useIsLoggedIn();
  return (
    <nav>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={4}
      >
        <Box display="flex" alignItems="center">
          <NextLink href="/home">
            <a>
              <Heading variant="h5" as="h5">
                sprt
              </Heading>
            </a>
          </NextLink>
          <Box mr={4} />
          {isLoggedIn && (
            <ButtonGroup>
              <NextLink href="new-event">
                <Button
                  colorScheme="gray"
                  variant="solid"
                  size="sm"
                  rightIcon={<BsPlus />}
                >
                  Create an event
                </Button>
              </NextLink>
              <Button
                size="sm"
                variant="outline"
                colorScheme="gray"
                rightIcon={<BsFileEarmarkPlus />}
              >
                Create a template
              </Button>
            </ButtonGroup>
          )}
        </Box>

        {isLoggedIn ? (
          <Button
            size="sm"
            variant="ghost"
            colorScheme="gray"
            onClick={() => {
              router.push("/");
              logout();
            }}
          >
            logout
          </Button>
        ) : (
          <ButtonGroup>
            <NextLink href="/login">
              <Button size="sm" variant="ghost">
                login
              </Button>
            </NextLink>

            <NextLink href="/register">
              <Button size="sm" variant="solid">
                sign up
              </Button>
            </NextLink>
          </ButtonGroup>
        )}
      </Box>
    </nav>
  );
};

export { BaseNavbar };
