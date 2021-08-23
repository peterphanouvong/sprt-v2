import { Menu, MenuButton, IconButton, MenuList } from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const OptionsButton = ({ children }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BsThreeDotsVertical />}
        variant="ghost"
      />
      <MenuList>{children}</MenuList>
    </Menu>
  );
};

export { OptionsButton };
