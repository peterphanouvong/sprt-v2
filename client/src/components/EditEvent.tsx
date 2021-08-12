import { EditIcon } from "@chakra-ui/icons";
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
  MenuItem,
} from "@chakra-ui/react";
import format from "date-fns/format";
import { Formik, Form } from "formik";
import React from "react";
import { useUpdateEventMutation } from "../generated/graphql";
import { Event } from "../models";
import { parseDate } from "../utils/parseDate";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";

interface Props {
  event: Event;
  editEvent: (e: Event) => void;
}

const EditEvent: React.FC<Props> = ({ event, editEvent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, updateEvent] = useUpdateEventMutation();

  return (
    <>
      <MenuItem onClick={onOpen} icon={<EditIcon />}>
        Edit
      </MenuItem>

      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding={4}
          >
            <Heading fontSize="large">Edit event</Heading>
            <CloseButton onClick={onClose} />
          </Box>
          <Divider />
          <Formik
            initialValues={{
              title: event.title ?? "",
              description: event.description ?? "",
              location: event.location ?? "",
              datetime: parseDate(event.datetime) ?? "",
            }}
            onSubmit={async (values) => {
              const formattedDate = format(
                new Date(values.datetime),
                "yyyy-MM-dd hh:mm:ss xxx"
              );
              const res = await updateEvent({
                input: {
                  ...values,
                  datetime: formattedDate,
                },
                id: event.id,
              });
              onClose();
              editEvent(res.data.updateEvent);
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
                    Edit
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

export { EditEvent };
