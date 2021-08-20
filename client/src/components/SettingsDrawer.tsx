import { SettingsIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton,
  Switch,
  FormControl,
  FormLabel,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

interface Props {}

const SettingsDrawer: React.FC<Props> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const btnRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  return (
    <>
      <IconButton
        ref={btnRef}
        colorScheme="orange"
        onClick={onOpen}
        aria-label="Open settings"
        icon={<SettingsIcon />}
        variant="ghost"
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>

          <DrawerBody>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="dark-mode" mb="0">
                Dark mode?
              </FormLabel>
              <Switch
                id="dark-mode"
                onChange={() => toggleColorMode()}
                defaultChecked={colorMode === "dark"}
              />
            </FormControl>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default SettingsDrawer;
