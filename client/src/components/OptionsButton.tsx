import { HamburgerIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, IconButton, MenuList } from "@chakra-ui/react";
import React from "react";

const OptionsButton = ({ children }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HamburgerIcon />}
        variant='ghost'
      />
      <MenuList>{children}</MenuList>
    </Menu>
  );
};

export { OptionsButton };
