import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Heading,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { ActiveLink } from "./ActiveLink";
import { BackButton } from "./BackButton";
import Logo from "./Logo";

interface Props {
  variant?: "page" | "home";
  title?: string | undefined;
}

const TopMobileNavbar: React.FC<Props> = ({ variant = "home", title }) => {
  const [{ data }] = useMeQuery();
  const [, logout] = useLogoutMutation();
  const router = useRouter();

  const isMobile = useIsMobileScreen();

  if (!data) return <></>;

  return data.me !== null ? (
    <Box
      zIndex={900}
      width='100%'
      bg={"white"}
      position='fixed'
      top='0'
      paddingX={2}
      paddingTop={2}
      height='55px'
      borderBottom='1px solid'
      borderColor='blackAlpha.300'
    >
      <Grid gridTemplateColumns='1fr 1fr 1fr' alignItems='center'>
        <Box textAlign='left'>
          {variant === "page" ? (
            <BackButton variant='ghost' />
          ) : (
            <NextLink href='/feed'>
              <Link height='40px'>
                <Logo size='sm' />
              </Link>
            </NextLink>
          )}
        </Box>
        <Heading textAlign='center' as='h5' variant='h5'>
          {title}
        </Heading>
        <Box textAlign='right'>
          <Button
            onClick={() => {
              router.push("/");
              logout();
            }}
            size={isMobile ? "xs" : "sm"}
          >
            logout
          </Button>
        </Box>
      </Grid>
    </Box>
  ) : (
    <Box
      zIndex={900}
      width='100%'
      bg={"white"}
      position='fixed'
      top='0'
      paddingX={2}
      paddingTop={2}
      height='55px'
      borderBottom='1px solid'
      borderColor='blackAlpha.300'
    >
      <Flex alignItems='center' justifyContent='space-between'>
        <NextLink href='/'>
          <Link height='40px'>
            <Logo size='sm' />
          </Link>
        </NextLink>
        <ButtonGroup>
          <ActiveLink href='/login'>
            <Button size={isMobile ? "xs" : "sm"}>login</Button>
          </ActiveLink>
          <ActiveLink href='/register'>
            <Button size={isMobile ? "xs" : "sm"}>register</Button>
          </ActiveLink>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export { TopMobileNavbar };
