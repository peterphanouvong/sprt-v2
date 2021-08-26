import {
  Box,
  Button,
  ButtonProps,
  CloseButton,
  Divider,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { ClubForm } from "./ClubForm";

type Props = ButtonProps;

const ClubCreateButton: React.FC<Props> = ({ ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button {...props} onClick={onOpen} width="full">
        Create a club
      </Button>

      <Modal
        closeOnOverlayClick={false}
        size="3xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding={4}
          >
            <Heading fontSize="large">Create Club</Heading>
            <CloseButton
              onClick={() => {
                onClose();
              }}
            />
          </Box>
          <Divider />

          <ClubForm onClose={onClose} formType={"Create club"} />
        </ModalContent>
      </Modal>
    </>
  );
};

export { ClubCreateButton };
