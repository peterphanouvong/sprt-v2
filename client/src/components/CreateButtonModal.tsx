import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

type Props = ButtonProps & {};

const CreateButtonModal: React.FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button {...props} onClick={onOpen}>
        {props.children}
      </Button>

      <MyModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const MyModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { CreateButtonModal };
