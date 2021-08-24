import { EditIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  CloseButton,
  Divider,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import { Event, useUpdateEventMutation } from "../generated/graphql";
import { formatDateForPostgres } from "../utils/parseDate";
import { EventForm } from "./EventForm";

interface Props {
  event: Event;
}

const EventEditButton: React.FC<Props> = ({ event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, updateEvent] = useUpdateEventMutation();

  const onSubmit = async (values) => {
    const { error } = await updateEvent({
      input: {
        ...values,
        startTime: formatDateForPostgres(values.startTime),
        endTime: formatDateForPostgres(values.endTime),
        capacity: values.capacity === "" ? null : parseInt(values.capacity),
      },
      id: event.id,
    });
    if (error) {
      console.log(error);
    } else {
      onClose();
    }
  };

  return (
    <>
      <MenuItem onClick={onOpen} icon={<EditIcon />}>
        Edit
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
            <Heading fontSize="large">Edit event</Heading>
            <CloseButton onClick={onClose} />
          </Box>
          <Divider />
          <EventForm
            event={event}
            onClose={onClose}
            onSubmit={onSubmit}
            // submitMessage='Save'
            clubId={null}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export { EventEditButton };
