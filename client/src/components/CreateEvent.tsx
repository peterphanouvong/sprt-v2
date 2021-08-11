import {
  useDisclosure,
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
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { useCreateEventMutation } from "../generated/graphql";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";

interface Props {
  addEvent: (e: any) => void;
}

const CreateEvent: React.FC<Props> = ({ addEvent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [, createPost] = useCreatePostMutation();
  const [, createEvent] = useCreateEventMutation();

  return (
    <>
      <Button onClick={onOpen}>Create event +</Button>

      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding={4}
          >
            <Heading fontSize="large">Create event</Heading>
            <CloseButton onClick={onClose} />
          </Box>
          <Divider />

          <Formik
            initialValues={{
              title: "",
              description: "",
              location: "",
              datetime: "",
            }}
            onSubmit={async (values) => {
              console.log(values);
              const { error, data } = await createEvent({ input: values });

              if (!error) {
                addEvent(data.createEvent);
                onClose();
              }
            }}
          >
            {(props) => (
              <Form>
                <VStack align="stretch" spacing={4} padding={4}>
                  <InputField
                    name="title"
                    placeholder="what's it called?"
                    label="Title"
                    required
                  />

                  <InputField
                    name="datetime"
                    placeholder="when do I show up?"
                    label="Date &amp; time"
                    required
                    type="datetime-local"
                  />

                  <InputField
                    name="location"
                    placeholder="where's it happening?"
                    label="Location"
                    required
                  />

                  <TextareaField
                    name="description"
                    placeholder="what's going down?"
                    label="Description"
                    required
                  />
                </VStack>

                <ModalFooter>
                  <Button
                    colorScheme="orange"
                    variant="ghost"
                    mr={3}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="orange"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Create
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

export { CreateEvent };
