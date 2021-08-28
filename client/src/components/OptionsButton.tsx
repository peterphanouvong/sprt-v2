import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuProps,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

type Props = MenuProps;

const OptionsButton: React.FC<Props> = ({
  closeOnSelect = true,
  children,
  ...props
}) => {
  return (
    <Menu closeOnSelect={closeOnSelect} {...props}>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BsThreeDots />}
        colorScheme="gray"
        variant="ghost"
      />
      <MenuList>{children}</MenuList>
    </Menu>
  );
};

export { OptionsButton };
