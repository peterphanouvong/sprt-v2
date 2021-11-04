import { Box, ListItem, UnorderedList } from "@chakra-ui/layout";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { BaseContainer } from "./BaseContainer";
import { BaseLogo } from "./BaseLogo";

interface Props {}

const subMenuItems = [
  { name: "Home", link: "/home" },
  { name: "Events", link: "/live-events" },
  { name: "Templates", link: "/templates" }
];

const BaseNavbarLoggedIn: React.FC<Props> = ({}) => {
  return (
    <Box
      position="fixed"
      width="100%"
      top="0"
      left="0"
      height="107px"
      bgColor="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      zIndex="999"
    >
      <BaseContainer>
        <Box
          paddingY={4}
          paddingX={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" alignItems="center">
            <BaseLogo size="sm" />
          </Box>

          <Box display="flex" alignItems="center">
            <NextLink href="/new-event">
              <a>
                <Button size="sm" variant="outline" colorScheme="gray">
                  Create event
                </Button>
              </a>
            </NextLink>

            <Box mr={2} />
            <a>
              <Button size="sm" variant="ghost" colorScheme="gray">
                Settings
              </Button>
            </a>
            <Box mr={2} />
            <ProfileAvatar />
          </Box>
        </Box>

        <SubMenu />
      </BaseContainer>
    </Box>
  );
};

const SubMenu = () => {
  return (
    <UnorderedList ml={0} listStyleType="none" display="flex">
      {subMenuItems.map((item) => (
        <SubMenuItem key={item.link} item={item} />
      ))}
    </UnorderedList>
  );
};

const SubMenuItem = ({ item }) => {
  const router = useRouter();

  const isActive = router.pathname.includes(`${item.link}`);

  return (
    <ListItem
      borderBottom="2px solid"
      borderColor={isActive ? "black" : "transparent"}
      paddingBottom={1}
    >
      <NextLink href={item.link}>
        <a>
          <Button variant="ghost" colorScheme="gray" size="sm">
            {item.name}
          </Button>
        </a>
      </NextLink>
    </ListItem>
  );
};

const ProfileAvatar = () => {
  const [, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  if (fetching) return <Spinner />;
  if (!fetching && !data) return <>error</>;
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      {data && (
        <Menu>
          <MenuButton>
            <Avatar name={`${data.me?.clubName}`} mr={4} size="sm" />
          </MenuButton>
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
      )}
    </Box>
  );
};

export { BaseNavbarLoggedIn };
