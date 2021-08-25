import {
  Box,
  Button,
  CloseButton,
  Divider,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useAddAttendeeMutation, User } from "../generated/graphql";

interface Props {
  attendees: User[];
  capacity: number | undefined | null;
  eventId: number;
  eventTitle: string;
}

const ViewAttendeesModalButton: React.FC<Props> = ({
  attendees,
  capacity,
  eventId,
  eventTitle,
}) => {
  const [, addAttendee] = useAddAttendeeMutation();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const joinEvent = async () => {
    const { error } = await addAttendee({ eventId: eventId });
    if (!error) {
      // router.reload();
      toast({
        title: "Joined event",
        variant: "subtle",
        description: `We've added you as an attendee to "${eventTitle}"`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      // router.reload();
    } else if (error) {
      toast({
        title: "Error",
        variant: "subtle",
        position: "top",
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  let attending: User[] = [];
  let waitlisted: User[] = [];
  if (capacity) {
    attending = attendees.filter((_, i) => i < capacity);
    waitlisted = attendees.filter((_, i) => i >= capacity);
  } else {
    attending = attendees;
  }

  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <>
      <Box onClick={onOpen} _hover={{ cursor: "pointer" }} textAlign="right">
        {capacity ? (
          <>
            <Text variant="body-3">Joined</Text>
            <Heading variant="h4">
              {attendees.length}/{capacity}
            </Heading>
            <Text variant="label">See attendees</Text>
          </>
        ) : (
          <>
            <Text variant="body-3">Already joined</Text>
            <Heading variant="h4">{attendees.length}</Heading>
            <Text variant="label">See who's going</Text>
          </>
        )}
      </Box>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding={4}
          >
            <Heading variant="h5" as="h5">
              Event attendees
            </Heading>
            <CloseButton onClick={onClose} />
          </Box>
          <Divider />

          <ModalBody paddingX={4}>
            <Tabs isFitted colorScheme="orange">
              <TabList>
                <Tab>
                  <Text variant="body-3">
                    Attending ({attending.length}
                    {capacity ? "/" + capacity : ""})
                  </Text>
                </Tab>
                <Tab>
                  <Text variant="body-3">Waitlist ({waitlisted.length})</Text>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel paddingY={0} paddingX={0} maxH="sm" overflowY="auto">
                  {attending.map((attendee) => (
                    <Box
                      key={attendee.id}
                      borderBottom="1px solid"
                      paddingY={2}
                      borderColor="gray.100"
                    >
                      <Text variant="body-2">
                        {attendee.firstname} {attendee.lastname}
                      </Text>
                    </Box>
                  ))}
                </TabPanel>
                <TabPanel paddingY={0} paddingX={2} maxH="sm" overflowY="auto">
                  {waitlisted.map((attendee) => (
                    <Box
                      key={attendee.id}
                      borderBottom="1px solid"
                      paddingY={2}
                      borderColor="gray.100"
                    >
                      {attendee.username}
                    </Box>
                  ))}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <HStack padding={4} spacing={4} justifyContent="flex-end">
            <Button
              size={buttonSize}
              colorScheme="orange"
              variant="ghost"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button size={buttonSize} colorScheme="orange" onClick={joinEvent}>
              Join
            </Button>
          </HStack>
        </ModalContent>
      </Modal>
    </>
  );
};

export { ViewAttendeesModalButton };
