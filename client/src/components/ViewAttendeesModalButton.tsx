import {
  Box,
  Button,
  ButtonProps,
  CloseButton,
  Divider,
  Flex,
  Heading,
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
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BsPeople } from "react-icons/bs";
import { User } from "../generated/graphql";
import { pluralize } from "../utils/pluralize";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { EventJoinedStat } from "./EventJoinedStat";

type Props = ButtonProps & {
  attendees: User[];
  capacity: number | undefined | null;
  eventId: number;
  eventTitle: string;
  as?: "button";
  buttonSize?: string;
};

const ViewAttendeesModalButton: React.FC<Props> = ({
  attendees,
  capacity,
  as = "stat",
  buttonSize = "md",
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isMobile = useIsMobileScreen();

  let attending: User[] = [];
  let waitlisted: User[] = [];
  if (capacity) {
    attending = attendees.filter((_, i) => i < capacity);
    waitlisted = attendees.filter((_, i) => i >= capacity);
  } else {
    attending = attendees;
  }

  return (
    <>
      {as === "button" ? (
        <Button
          rightIcon={<BsPeople />}
          size={isMobile ? "xs" : "sm"}
          {...props}
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
        >
          View {attendees.length} {capacity ? `/${capacity}` : ""}{" "}
          {pluralize(attendees.length, "attendee")}
        </Button>
      ) : (
        <EventJoinedStat
          capacity={capacity}
          attendees={attendees}
          onOpen={onOpen}
        />
      )}

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

          <Flex padding={4} justifyContent="flex-end">
            <Button
              size={isMobile ? "sm" : "md"}
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export { ViewAttendeesModalButton };
