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
  InputGroup,
  InputLeftElement,
  Input,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { Formik, Form, ErrorMessage } from "formik";
import React from "react";
import { Club, useCreateClubMutation } from "../generated/graphql";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";
import * as Yup from "yup";

interface Props {
  addClub: (data: Club) => void;
}

const CreateClub: React.FC<Props> = ({ addClub }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, createClub] = useCreateClubMutation();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const CreateClubSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email cannot be blank!"),
    name: Yup.string()
      .min(1, "Club name is too short!")
      .max(50, "Club name is too long!")
      .required("Name cannot be blank!"),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number cannot be blank!"),
  });

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

          <Formik
            initialValues={{
              name: "",
              description: "",
              email: "",
              phoneNumber: "",
            }}
            validationSchema={CreateClubSchema}
            onSubmit={async (values) => {
              console.log(values);
              const { data, error } = await createClub({ input: values });
              console.log(data);
              if (!error) {
                onClose();
                addClub(data.createClub);
              }
            }}
          >
            {(props) => {
              return (
                <Form>
                  <VStack align='stretch' spacing={4} padding={4}>
                    <InputField
                      name='name'
                      placeholder="What's your club name?"
                      label='Name'
                    />

                    <InputField
                      name='email'
                      placeholder='example@email.com'
                      label='Email'
                      icon={<EmailIcon color='gray.300' />}
                    />

                    <InputField
                      name='phoneNumber'
                      placeholder='04XXXXXXXX'
                      label='Phone Number'
                      icon={<PhoneIcon color='gray.300' />}
                    />

                    <TextareaField
                      name='description'
                      placeholder="What's up?"
                      label='Description'
                    />
                  </VStack>

                  <ModalFooter>
                    <Button
                      colorScheme='orange'
                      variant='ghost'
                      mr={3}
                      onClick={onClose}
                    >
                      Close
                    </Button>
                    <Button
                      colorScheme='orange'
                      isLoading={props.isSubmitting}
                      type='submit'
                    >
                      Post
                    </Button>
                  </ModalFooter>
                </Form>
              );
            }}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateClub;
