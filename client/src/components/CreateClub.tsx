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
import { Club, useCreateClubMutation } from "../generated/graphql";
import { Card } from "./Card";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";

interface Props {
  addClub: (data: Club) => void;
}

const CreateClub: React.FC<Props> = ({ addClub }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, createClub] = useCreateClubMutation();
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
            initialValues={{ name: "", description: "", email: "" }}
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
            {(props) => (
              <Form>
                <VStack align='stretch' spacing={4} padding={4}>
                  <InputField
                    name='name'
                    placeholder='name'
                    label='Name'
                    required
                  />

                  <InputField
                    name='email'
                    placeholder='email'
                    label='Email'
                    required
                  />

                  <TextareaField
                    name='description'
                    placeholder="what's up?"
                    label='Description'
                    required
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
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateClub;
