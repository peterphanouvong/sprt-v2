import {
  Box,
  Button,
  CloseButton,
  Divider,
  Heading,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Card } from "./Card";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";

interface Props {}

const PostCreateButton: React.FC<Props> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, createPost] = useCreatePostMutation();

  return (
    <>
      <Card>
        <VStack spacing={4} alignItems="start">
          <Heading as="h1" fontSize="lg">
            Create post
          </Heading>
          <Button onClick={onOpen} fontWeight="normal" width="full">
            What's on your mind?
          </Button>
        </VStack>
      </Card>

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
            <Heading fontSize="large">Create post</Heading>
            <CloseButton onClick={onClose} />
          </Box>
          <Divider />

          <Formik
            initialValues={{ title: "", description: "" }}
            onSubmit={async (values) => {
              console.log(values);
              const { error } = await createPost({ input: values });
              console.log(error);
              if (!error) {
                onClose();
              }
            }}
          >
            {(props) => (
              <Form>
                <VStack align="stretch" spacing={4} padding={4}>
                  <InputField
                    name="title"
                    placeholder="title"
                    label="Title"
                    required
                    touched={props.touched.title as boolean}
                  />

                  <TextareaField
                    name="description"
                    placeholder="what's up?"
                    label="Description"
                    required
                  />
                </VStack>

                <ModalFooter>
                  <Button
                    colorScheme="brand"
                    variant="ghost"
                    mr={3}
                    onClick={onClose}
                  >
                    Close
                  </Button>
                  <Button
                    colorScheme="brand"
                    isLoading={props.isSubmitting}
                    type="submit"
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

export default withUrqlClient(createUrqlClient)(PostCreateButton);
