import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  VStack,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  CloseButton,
  Divider,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { useCreateClubMutation } from "../generated/graphql";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";
import * as Yup from "yup";
import { errorMessageToObject } from "../utils/errorMessageToObject";
import { ClubForm } from "./ClubForm";

interface Props {
  // addClub: (data: Club) => void;
}

const CreateClub: React.FC<Props> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} fontWeight='normal' width='full'>
        Create a New Club!
      </Button>

      <Modal size='3xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            padding={4}
          >
            <Heading fontSize='large'>Create Club</Heading>
            <CloseButton onClick={onClose} />
          </Box>
          <Divider />

          <ClubForm onClose={onClose} formType={"Post"} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateClub;
