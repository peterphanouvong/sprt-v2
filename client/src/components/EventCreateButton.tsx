import { ChevronDownIcon } from "@chakra-ui/icons";
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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ButtonProps,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useCreateEventMutation, useMeQuery } from "../generated/graphql";
import { formatDateForPostgres } from "../utils/parseDate";
import { EventForm } from "./EventForm";
import { MotionBox } from "./MotionBox";

type Props = ButtonProps;

const EventCreateButton: React.FC<Props> = ({ ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, createEvent] = useCreateEventMutation();
  const [{ data, fetching }] = useMeQuery();

  const toast = useToast();

  const [creator, setCreator] = useState<string | undefined>("");
  const [clubId, setClubId] = useState<number | null>(null);

  const onSubmit = async (values) => {
    const { error } = await createEvent({
      input: {
        ...values,
        startTime: formatDateForPostgres(values.startTime),
        endTime: formatDateForPostgres(values.endTime),
        capacity: values.capacity === "" ? null : parseInt(values.capacity),
      },
    });

    if (!error) {
      onClose();
      toast({
        position: "top",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
        status: "success",
        title: `Successfully created "${values.title}".`,
        description: "Find it on the explore page.",
      });
    }
  };

  if (!data && !fetching) return <>Something bad happened</>;
  if (!data) return <>Spinner</>;

  return (
    <MotionBox
      transformOrigin="center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {!!data.me?.adminClubs?.length ? (
        <Menu>
          <MenuButton as={Button} {...props} rightIcon={<ChevronDownIcon />}>
            Create event
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                setCreator(data.me?.username);
                setClubId(null);
                onOpen();
              }}
            >
              as {data.me?.username}
              <Text variant="label" ml={2} mt={0.5} display="inline">
                (yourself)
              </Text>
            </MenuItem>
            {data.me?.adminClubs?.map((club, i) => {
              return (
                <MenuItem
                  key={i}
                  onClick={() => {
                    setCreator(club.name);
                    setClubId(club.id);
                    onOpen();
                  }}
                >
                  as {club.name}
                  <Text variant="label" ml={2} mt={0.5} display="inline">
                    (your club)
                  </Text>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      ) : (
        <Button
          onClick={() => {
            setCreator(data.me?.username);
            onOpen();
          }}
        >
          Create event +
        </Button>
      )}

      <Modal
        closeOnOverlayClick={false}
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            paddingX={6}
            paddingY={4}
          >
            <Heading fontSize="large">{creator}'s event</Heading>
            <CloseButton onClick={onClose} />
          </Box>
          <Divider />
          <EventForm onClose={onClose} onSubmit={onSubmit} clubId={clubId} />
        </ModalContent>
      </Modal>
    </MotionBox>
  );
};

export { EventCreateButton };
