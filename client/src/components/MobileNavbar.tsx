import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import React from "react";
import {
  BsAward,
  BsAwardFill,
  BsHouseDoor,
  BsHouseDoorFill,
  BsPeople,
  BsPeopleFill,
  BsPerson,
  BsPersonFill,
} from "react-icons/bs";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";
// import Logo from "./Logo";

interface Props {}

const MobileNavbar: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery({});

  console.log(router.pathname);

  if (!data && !fetching) <>uh oh</>;
  if (!data) return <></>;

  return (
    <>
      <Box
        zIndex={900}
        width="100%"
        bg={"white"}
        position="fixed"
        bottom="0"
        padding={2}
        paddingTop={3}
        borderTop="1px solid"
        borderColor="blackAlpha.300"
      >
        <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"}>
          <NextLink href="/feed">
            <VStack as="a" spacing={1} textAlign="center">
              {router.pathname === "/feed" ? (
                <BsHouseDoorFill />
              ) : (
                <BsHouseDoor />
              )}
              <Text variant="label">Home</Text>
            </VStack>
          </NextLink>

          <NextLink href="/explore">
            <VStack spacing={1} textAlign="center">
              {router.pathname === "/explore" ? <BsAwardFill /> : <BsAward />}
              <Text variant="label">Explore</Text>
            </VStack>
          </NextLink>

          <NextLink href={`/my-club/${data.me?.id}`}>
            <VStack spacing={1} textAlign="center">
              {router.pathname === "/my-club/[id]" ? (
                <BsPeopleFill />
              ) : (
                <BsPeople />
              )}
              <Text variant="label">My Club</Text>
            </VStack>
          </NextLink>

          <NextLink href={`/${data.me?.username}`}>
            <VStack spacing={1} textAlign="center">
              {router.pathname === "/[username]" ? (
                <BsPersonFill />
              ) : (
                <BsPerson />
              )}
              <Text variant="label">Profile</Text>
            </VStack>
          </NextLink>
        </Grid>
      </Box>
    </>
  );
};

export { MobileNavbar };
