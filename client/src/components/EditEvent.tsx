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
import { Event, useUpdateEventMutation } from "../generated/graphql";
import { parseDate } from "../utils/parseDate";
import { EventForm } from "./EventForm";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";

interface Props {
  event: Event;
  // editEvent: (e: Event) => void;
}

const EditEvent: React.FC<Props> = ({ event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, updateEvent] = useUpdateEventMutation();

  const onSubmit = async (values) => {
    const formattedStartTime = format(
      new Date(values.startTime),
      "yyyy-MM-dd hh:mm:ss xxx"
    );
    const formattedEndTime = format(
      new Date(values.endTime),
      "yyyy-MM-dd hh:mm:ss xxx"
    );
    const res = await updateEvent({
      input: {
        ...values,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      },
      id: event.id,
    });
    onClose();
    // editEvent(res.data.updateEvent);
  };

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
          <EventForm event={event} onClose={onClose} onSubmit={onSubmit} />
        </ModalContent>
      </Modal>
    </>
  );
};

export { EditEvent };
