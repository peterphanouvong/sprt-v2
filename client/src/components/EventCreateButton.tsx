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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useCreateEventMutation, useMeQuery } from "../generated/graphql";
import { formatDateForPostgres } from "../utils/parseDate";
import { EventForm } from "./EventForm";

interface Props {}

const EventCreateButton: React.FC<Props> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, createEvent] = useCreateEventMutation();
  const [{ data, fetching }] = useMeQuery();

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

    console.log(error);

    if (!error) {
      onClose();
    }
  };

  if (!data && !fetching) return <>Something bad happened</>;
  if (!data) return <>Spinner</>;

  console.log(data);

  return (
    <>
      {data.me!.adminClubs!.length > 0 ? (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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

      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
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
    </>
  );
};

export { EventCreateButton };
