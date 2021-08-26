import { Box, Flex, Grid, Heading, IconButton, Link } from "@chakra-ui/react";
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
      <Grid gridTemplateColumns="1fr 1fr 1fr" alignItems="center">
        <Box textAlign="left">
          {variant === "page" ? (
            <BackButton variant="ghost" />
          ) : (
            <NextLink href="/home">
              <Link height="40px">
                <Logo size="sm" />
              </Link>
            </NextLink>
          )}
        </Box>
        <Heading textAlign="center" as="h5" variant="h5">
          {title}
        </Heading>
        <Box textAlign="right">
          <IconButton
            variant="ghost"
            aria-label="menu"
            icon={<HamburgerIcon />}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export { TopMobileNavbar };
