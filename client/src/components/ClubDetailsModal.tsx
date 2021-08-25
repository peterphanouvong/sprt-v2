import {
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  Heading,
  CloseButton,
  Divider,
  ModalBody,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Club, MeQuery, useClubQuery, useMeQuery } from "../generated/graphql";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  clubId: number;
  userData: MeQuery;
}

const ClubDetailsModal: React.FC<Props> = ({
  isOpen,
  onOpen,
  onClose,
  clubId,
  userData,
}) => {
  const [{ data, fetching, error }] = useClubQuery({
    pause: clubId === -1,
    variables: { clubId: clubId },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width={"28rem"} maxWidth='80%'>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          padding={4}
        >
          <Heading variant={"h5"}>What Header Should Go Here?</Heading>
          <CloseButton onClick={onClose} />
        </Box>
        <Divider />
        <ModalBody p={2}>
          <Tabs isFitted colorScheme='orange'>
            <TabList>
              <Tab>
                <Text variant='body-3'>
                  Followers ({data.club.followers.length})
                </Text>
              </Tab>
              <Tab>
                <Text variant='body-3'>
                  Members ({data.club.members.length})
                </Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel paddingY={0} paddingX={2} maxH='sm' overflowY='auto'>
                {data.club.followers.map((user) => (
                  <Box
                    key={user.id}
                    borderBottom='1px solid'
                    paddingY={2}
                    borderColor='gray.100'
                  >
                    <Text variant={"body-2"}>{user.username}</Text>
                  </Box>
                ))}
              </TabPanel>
              <TabPanel paddingY={0} paddingX={2} maxH='sm' overflowY='auto'>
                {data.club.members.map((user) => (
                  <Box
                    key={user.id}
                    borderBottom='1px solid'
                    paddingY={2}
                    borderColor='gray.100'
                  >
                    <Text variant={"body-2"}>{user.username}</Text>
                  </Box>
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='orange'
            mr={3}
            onClick={onClose}
            size='sm'
            variant='ghost'
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { ClubDetailsModal };
