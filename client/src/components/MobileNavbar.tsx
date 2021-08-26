import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import {
  BsAward,
  BsAwardFill,
  BsHeart,
  BsHeartFill,
  BsHouseDoor,
  BsHouseDoorFill,
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
        <Flex justifyContent="space-around">
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

          <NextLink href="/events">
            <VStack spacing={1} textAlign="center">
              {router.pathname === "/events" ? <BsAwardFill /> : <BsAward />}
              <Text variant="label">Explore</Text>
            </VStack>
          </NextLink>

          <NextLink href="/clubs">
            <VStack spacing={1} textAlign="center">
              {router.pathname === "/clubs" ? <BsHeartFill /> : <BsHeart />}
              <Text variant="label">Activity</Text>
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
        </Flex>
      </Box>
    </>
  );
};

export { MobileNavbar };
