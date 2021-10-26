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
  Divider,
} from "@chakra-ui/react";
import React from "react";
import {
  BsGear,
  BsHouse,
  BsLightningFill,
  BsLightning,
  BsPeople,
  BsFileEarmarkPlus,
  BsCalendar,
} from "react-icons/bs";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import NextLink from "next/link";
import { useRouter } from "next/router";

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
      minW="300px"
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
  const router = useRouter();

  return (
    <Flex flexDir="column">
      <Heading mb={8} ml={2} mt={4} as="h4" variant="h4">
        <Icon as={BsLightningFill} /> sprt
      </Heading>

      <VStack alignItems="stretch">
        <NextLink href="/home">
          <Button
            color="gray.600"
            colorScheme="gray"
            leftIcon={<BsHouse />}
            justifyContent="start"
            size="sm"
            variant="ghost"
            isActive={router.pathname === "/home"}
          >
            Home
          </Button>
        </NextLink>

        <Button
          color="gray.600"
          colorScheme="gray"
          leftIcon={<BsPeople />}
          justifyContent="start"
          size="sm"
          variant="ghost"
        >
          My Club
        </Button>

        <Divider />

        <Text p={3} fontSize="xs" variant="caption" fontWeight="semibold">
          Events
        </Text>

        <NextLink href="/events">
          <Button
            color="gray.600"
            colorScheme="gray"
            leftIcon={<BsLightning />}
            justifyContent="start"
            size="sm"
            variant="ghost"
            isActive={router.pathname === "/events"}
          >
            Event list
          </Button>
        </NextLink>

        <NextLink href="/new-event">
          <Button
            color="gray.600"
            colorScheme="gray"
            leftIcon={<BsCalendar />}
            justifyContent="start"
            size="sm"
            variant="ghost"
            isActive={router.pathname === "/new-event"}
          >
            Create new event
          </Button>
        </NextLink>

        <Button
          color="gray.600"
          colorScheme="gray"
          leftIcon={<BsFileEarmarkPlus />}
          justifyContent="start"
          size="sm"
          variant="ghost"
        >
          Create new template
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
                <Avatar name={`${data.me?.clubName}`} mr={4} size="sm" />

                <Box display="flex" flexDirection="column">
                  <Text
                    _hover={{
                      textDecoration: "underline",
                    }}
                    textTransform="capitalize"
                    variant="body-3"
                  >
                    {data.me?.clubName}
                  </Text>
                  <Text
                    _hover={{
                      textDecoration: "underline",
                    }}
                    variant="meta"
                  >
                    {data.me?.email}
                  </Text>
                </Box>
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
