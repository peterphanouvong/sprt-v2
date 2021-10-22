import React from "react";
import { BaseLogo } from "./BaseLogo";
import NextLink from "next/link";
import { useIsLoggedIn } from "../utils/useIsLoggedIn";
import { useLogoutMutation } from "../generated/graphql";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

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
        paddingY={2}
      >
        <NextLink href="/home">
          <a>
            <BaseLogo />
          </a>
        </NextLink>

        {isLoggedIn ? (
          <Button
            variant="ghost"
            onClick={() => {
              router.push("/");
              logout();
            }}
          >
            Logout
          </Button>
        ) : (
          <ButtonGroup>
            <NextLink href="/login">
              <Button variant="ghost">Login</Button>
            </NextLink>

            <NextLink href="/register">
              <Button variant="solid">Sign Up</Button>
            </NextLink>
          </ButtonGroup>
        )}
      </Box>
    </nav>
  );
};

export { BaseNavbar };
