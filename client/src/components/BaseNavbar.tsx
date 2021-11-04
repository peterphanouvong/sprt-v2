import { Button, ButtonGroup } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface Props {}

const BaseNavbar: React.FC<Props> = ({}) => {
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
        </Box>

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
      </Box>
    </nav>
  );
};

export { BaseNavbar };
