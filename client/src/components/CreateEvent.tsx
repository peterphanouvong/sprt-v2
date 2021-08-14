import {
  useDisclosure,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  CloseButton,
  Divider,
} from "@chakra-ui/react";
import format from "date-fns/format";
import React from "react";
import { useCreateEventMutation } from "../generated/graphql";
import { EventForm } from "./EventForm";

interface Props {
  // addEvent: (e: any) => void;
}

const CreateEvent: React.FC<Props> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [, createPost] = useCreatePostMutation();
  const [, createEvent] = useCreateEventMutation();

  const onSubmit = async (values) => {
    console.log(values);

    const formattedStartTime = format(
      new Date(values.startTime),
      "yyyy-MM-dd hh:mm:ss xxx"
    );

    const formattedEndTime = format(
      new Date(values.endTime),
      "yyyy-MM-dd hh:mm:ss xxx"
    );

    const { error } = await createEvent({
      input: {
        ...values,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      },
    });

    if (!error) {
      // addEvent(data.createEvent);
      onClose();
    }
  };

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
          <EventForm onClose={onClose} onSubmit={onSubmit} />
        </ModalContent>
      </Modal>
    </>
  );
};

export { CreateEvent };
