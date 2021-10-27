import { useDisclosure } from "@chakra-ui/hooks";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Box,
  CloseButton,
  Divider,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";

interface Props {
  setLoggedIn: (boolean) => void;
}

const ViewAsAdminModal: React.FC<Props> = ({ setLoggedIn }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isMobile = useIsMobileScreen();
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handleInputChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (password === "BlueCat846") {
      setLoggedIn(true);
      setIsInvalid(false);
      onClose();
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <>
      <Button mt={4} colorScheme="blue" variant="ghost" onClick={onOpen}>
        View as Admin
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding={4}
          >
            <Heading variant="h5" as="h5">
              Login
            </Heading>
            <CloseButton onClick={onClose} />
          </Box>
          <Divider />
          <ModalBody>
            <Text mb={4}>Enter the password below</Text>
            <Input
              isInvalid={isInvalid}
              value={password}
              onChange={handleInputChange}
              placeholder="password"
              type="password"
            ></Input>
            {isInvalid && (
              <Text variant="label" color="red">
                wrong password
              </Text>
            )}
          </ModalBody>

          <Flex padding={4} justifyContent="flex-end">
            <Button
              size={isMobile ? "sm" : "md"}
              variant="ghost"
              colorScheme="gray"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              size={isMobile ? "sm" : "md"}
              colorScheme="blue"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export { ViewAsAdminModal };
