import {
  Box,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { TemplateEventForm } from "./TemplateEventForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TemplateCreateModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <Box padding={4}>
          <Heading
            pb={4}
            as="h6"
            variant="h6"
            borderBottom="1px solid"
            borderColor="gray.200"
          >
            Create an event template
          </Heading>
          <Box maxH="70vh" overflow="auto">
            <TemplateEventForm onClose={onClose} />
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export { TemplateCreateModal };
