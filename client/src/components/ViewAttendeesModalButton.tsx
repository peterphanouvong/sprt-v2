import {
  Box,
  Button,
  CloseButton,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { User } from "../generated/graphql";

interface Props {
  attendees: User[];
  capacity: number | undefined;
  joinEvent: () => Promise<void>;
}

const ViewAttendeesModalButton: React.FC<Props> = ({
  attendees,
  capacity,
  joinEvent,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let attending = [];
  let waitlisted = [];
  if (capacity) {
    attending = attendees.filter((_, i) => i < capacity);
    waitlisted = attendees.filter((_, i) => i >= capacity);
  } else {
    attending = attendees;
  }

  return (
    <>
      <Button mt={2} size="sm" variant="outline" onClick={onOpen}>
        Attendees ({attending.length}
        {capacity ? "/" + capacity : ""}){` & waitlist (${waitlisted.length})`}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding={4}
          >
            <Heading fontSize="large">Event attendees</Heading>
            <CloseButton onClick={onClose} />
          </Box>
          <Divider />

          <ModalBody p={2}>
            <Tabs isFitted>
              <TabList>
                <Tab>
                  Attending ({attending.length}
                  {capacity ? "/" + capacity : ""})
                </Tab>
                <Tab>Waitlist ({waitlisted.length})</Tab>
              </TabList>
              <TabPanels>
                <TabPanel paddingY={0} paddingX={2} maxH="sm" overflowY="auto">
                  {attending.map((attendee) => (
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

          <ModalFooter>
            <Button
              colorScheme="orange"
              variant="ghost"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button colorScheme="orange" onClick={joinEvent}>
              Join
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { ViewAttendeesModalButton };
