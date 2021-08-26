import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuProps,
  Tooltip,
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
      <Tooltip label="options">
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<BsThreeDots />}
          variant="ghost"
        />
      </Tooltip>
      <MenuList>{children}</MenuList>
    </Menu>
  );
};

export { OptionsButton };
