import {
  Heading,
  Text,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  CloseButton,
  Divider,
} from "@chakra-ui/react";
import Image from "next/image";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Card } from "../../components/Card";
import { Layout } from "../../components/Layout";
import {
  useClubQuery,
  User,
  Club as ClubType,
  useMeQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { ClubSimpleCard } from "../../components/ClubSimpleCard";
import { ClubDetailsModal } from "../../components/ClubDetailsModal";

const Club = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data: userData, fetching: userFetching }] = useMeQuery();

  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching, error }] = useClubQuery({
    pause: intId === -1,
    variables: { clubId: intId },
  });

  // const [numFollowers, setNumFollowers] = React.useState<number>(
  //   data.club.followers.length
  // );

  // const updateNumFollowers = (num: number) => {
  //   setNumFollowers(numFollowers + num);
  // };

  // const [followers, setFollowers] = React.useState<User[]>(
  //   data?.club.followers as User[]
  // );
  // const [members, setMembers] = React.useState<User[]>(
  //   data?.club.members as unknown as User[]
  // );

  if (fetching || userFetching) return <>loading..</>;
  if (error) return <Layout>{error.message}</Layout>;
  if (!data) return <Layout>couldn't find the club</Layout>;
  if (!data?.club) return <Layout>couldn't find the club</Layout>;

  console.log(userData);

  console.log(data.club);
  return (
    <Layout>
      <ClubSimpleCard
        club={data.club as ClubType}
        modalOpen={onOpen}
        modalClose={onClose}
        userData={userData}
        // updateNumFollowers={(num: number) => updateNumFollowers(num)}
      />
      <ClubDetailsModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        clubId={intId}
        userData={userData}
      />
      {/* <Modal isOpen={isOpen} onClose={onClose}>
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
                  {data.club.followers.map((attendee) => (
                    <Box
                      key={attendee.id}
                      borderBottom='1px solid'
                      paddingY={2}
                      borderColor='gray.100'
                    >
                      <Text variant={"body-2"}>{attendee.username}</Text>
                    </Box>
                  ))}
                </TabPanel>
                <TabPanel paddingY={0} paddingX={2} maxH='sm' overflowY='auto'>
                  {members.map((attendee) => (
                    <Box
                      key={attendee.id}
                      borderBottom='1px solid'
                      paddingY={2}
                      borderColor='gray.100'
                    >
                      <Text variant={"body-2"}>{attendee.username}</Text>
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
      </Modal> */}

      <Card></Card>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Club);
