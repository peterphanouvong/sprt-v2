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
  Skeleton,
} from "@chakra-ui/react";
import React from "react";
import { Club, useClubQuery } from "../generated/graphql";
import { ClubForm } from "./ClubForm";

interface Props {
  clubId: number;
}

const ClubEditButton: React.FC<Props> = ({ clubId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data }] = useClubQuery({ variables: { clubId: clubId } });

  if (!data) return <Skeleton></Skeleton>;

  return (
    <>
      <MenuItem onClick={onOpen} icon={<EditIcon />}>
        <Text>Edit</Text>
      </MenuItem>

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
            <Heading fontSize="large">Edit club</Heading>
            <CloseButton onClick={onClose} />
          </Box>
          <Divider />
          <ClubForm
            club={data.club as Club}
            onClose={onClose}
            formType={"Edit"}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export { ClubEditButton };
