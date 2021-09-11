import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CloseButton,
  Divider,
  Heading,
  MenuItem,
  Modal,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Club, useClubQuery } from "../generated/graphql";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { ClubForm } from "./ClubForm";
import router from "next/router";

interface Props {
  clubId: number;
  as?: "menuItem" | "button";
}

const ClubEditButton: React.FC<Props> = ({ clubId, as = "button" }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data }] = useClubQuery({ variables: { clubId: clubId } });
  console.log(data);
  const isMobile = useIsMobileScreen();

  const handleEdit = () => {
    router.push(`/my-club/edit/${data?.club.admins[0].id}`);
  };

  if (!data) return <Skeleton></Skeleton>;

  return (
    <>
      {as === "button" ? (
        <Button
          size={isMobile ? "xs" : "sm"}
          variant='outline'
          onClick={(e) => {
            e.stopPropagation();
            // onOpen();
            handleEdit();
          }}
        >
          Edit
        </Button>
      ) : (
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
            // handleEdit();
          }}
          icon={<EditIcon />}
        >
          <Text>Edit</Text>
        </MenuItem>
      )}

      <Modal
        closeOnOverlayClick={false}
        size='3xl'
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            padding={4}
          >
            <Heading fontSize='large'>Edit club</Heading>
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
