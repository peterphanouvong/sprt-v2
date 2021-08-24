import { EditIcon } from "@chakra-ui/icons";
import {
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  Heading,
  CloseButton,
  Divider,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Club } from "../generated/graphql";
import { ClubForm } from "./ClubForm";

interface Props {
  club: Club;
}

const ClubEditButton: React.FC<Props> = ({ club }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuItem onClick={onOpen} icon={<EditIcon />}>
        <Text>Edit</Text>
      </MenuItem>

      <Modal size='3xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            padding={4}
          >
            <Heading fontSize='large'>Edit Club</Heading>
            <CloseButton onClick={onClose} />
          </Box>
          <Divider />
          <ClubForm club={club} onClose={onClose} formType={"Edit"} />
        </ModalContent>
      </Modal>
    </>
  );
};

export { ClubEditButton };
