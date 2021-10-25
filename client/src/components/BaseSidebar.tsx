import {
  Avatar,
  Box,
  Heading,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Flex,
  Button,
  VStack,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import {
  BsGear,
  BsHouse,
  BsLightningFill,
  BsLightning,
  BsPeople,
} from "react-icons/bs";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import NextLink from "next/link";

interface Props {}

const BaseSidebar: React.FC<Props> = ({}) => {
  return (
    <Box
      bg="gray.50"
      borderRight="1px solid"
      borderRightColor="gray.200"
      bottom="0"
      display="flex"
      flexDir="column"
      height="100vh"
      justifyContent="space-between"
      left="0"
      padding={4}
      position="fixed"
      top="0"
      width="20vw"
    >
      <SidebarTopper />
      <SidebarFooter />
    </Box>
  );
};

const SidebarTopper = () => {
  return (
    <Flex flexDir="column">
      <Heading mb={6} ml={2} as="h4" variant="h4">
        <Icon as={BsLightningFill} /> sprt
      </Heading>

      <VStack alignItems="stretch">
        <NextLink href="/home">
          <Button
            leftIcon={<BsHouse />}
            variant="ghost"
            colorScheme="gray"
            justifyContent="start"
            size="sm"
          >
            Home
          </Button>
        </NextLink>

        <Button
          leftIcon={<BsLightning />}
          variant="ghost"
          colorScheme="gray"
          justifyContent="start"
          size="sm"
        >
          Events
        </Button>

        <Button
          leftIcon={<BsPeople />}
          variant="ghost"
          colorScheme="gray"
          justifyContent="start"
          size="sm"
        >
          My Club
        </Button>
      </VStack>
    </Flex>
  );
};

const SidebarFooter = () => {
  const [, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  if (fetching) return <Spinner />;
  if (!fetching && !data) return <>error</>;
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      {data && (
        <>
          <NextLink href="#">
            <a>
              <Flex alignItems="center">
                <Avatar
                  name={`${data.me?.clubName}`}
                  mr={2}
                  size="sm"
                  // src="https://bit.ly/dan-abramov"
                />

                <Text
                  _hover={{
                    textDecoration: "underline",
                  }}
                  textTransform="capitalize"
                >
                  {data.me?.clubName}
                </Text>
              </Flex>
            </a>
          </NextLink>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<BsGear />}
              colorScheme="gray"
              variant="ghost"
              aria-label="Search database"
            ></MenuButton>
            <MenuList>
              <MenuItem
                onClick={async () => {
                  await logout();
                }}
              >
                Logout
              </MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </>
      )}
    </Box>
  );
};

export { BaseSidebar };
