import {
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  CloseButton,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { ClubForm } from "./ClubForm";

interface Props {
  // addClub: (data: Club) => void;
}

const CreateClub: React.FC<Props> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} fontWeight="normal" width="full">
        Create a New Club!
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
            <CloseButton onClick={onClose} />
          </Box>
          <Divider />

          <ClubForm onClose={onClose} formType={"Post"} />
        </ModalContent>
      </Modal>
    </>
  );
};

export { CreateClub };
