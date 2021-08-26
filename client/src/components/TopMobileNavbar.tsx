import { Box, Flex, Heading, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import Logo from "./Logo";
import NextLink from "next/link";
import { BackButton } from "./BackButton";
import { HamburgerIcon } from "@chakra-ui/icons";

interface Props {
  variant?: "page" | "home";
  title?: string | undefined;
}

const TopMobileNavbar: React.FC<Props> = ({ variant = "home", title }) => {
  return (
    <Box
      zIndex={900}
      width="100%"
      bg={"white"}
      position="fixed"
      top="0"
      paddingX={2}
      paddingTop={2}
      height="55px"
      borderBottom="1px solid"
      borderColor="blackAlpha.300"
    >
      <Flex justifyContent="space-between" alignItems="center">
        {variant === "page" ? (
          <BackButton variant="ghost" />
        ) : (
          <NextLink href="/home">
            <Link height="40px">
              <Logo size="sm" />
            </Link>
          </NextLink>
        )}
        <Heading as="h5" variant="h5">
          {title}
        </Heading>
        <IconButton
          variant="ghost"
          aria-label="menu"
          icon={<HamburgerIcon />}
        />
      </Flex>
    </Box>
  );
};

export { TopMobileNavbar };
