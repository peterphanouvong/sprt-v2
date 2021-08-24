import { Menu, MenuButton, IconButton, MenuList } from "@chakra-ui/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

const OptionsButton = ({ children }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BsThreeDots />}
        variant="ghost"
      />
      <MenuList>{children}</MenuList>
    </Menu>
  );
};

export { OptionsButton };
