import {
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  CloseButton,
  Divider,
  ButtonProps,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
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

          <ClubForm onClose={onClose} formType={"Post"} />
        </ModalContent>
      </Modal>
    </>
  );
};

export { ClubCreateButton };
