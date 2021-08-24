import {
  Heading,
  Text,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  ListItem,
  UnorderedList,
  CloseButton,
  Divider,
  Spacer,
  HStack,
  Icon,
} from "@chakra-ui/react";
import Image from "next/image";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Card } from "../../components/Card";
import { Layout } from "../../components/Layout";
import {
  useClubQuery,
  useMeQuery,
  User,
  Club as ClubType,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { BsPersonFill } from "react-icons/bs";

import stockBanner from "../../images/stock_banner.jpeg";
import { ClubFollowButton } from "../../components/ClubFollowButton";
import { AccordionUsers } from "../../components/AccordionUsers";
import { pluralize } from "../../utils/pluralize";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { ClubJoinButton } from "../../components/ClubJoinButton";
import { ClubSimpleCard } from "../../components/ClubSimpleCard";

const Club = () => {
  const [{ data: userData }] = useMeQuery();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching, error }] = useClubQuery({
    pause: intId === -1,
    variables: { clubId: intId },
  });

  const [followers, setFollowers] = React.useState<User[]>(
    data?.club.followers as User[]
  );
  const [members, setMembers] = React.useState<User[]>(
    data?.club.members as unknown as User[]
  );

  const addFollower = () => {
    setFollowers([...followers, userData!.me as User]);
  };

  const removeFollower = () => {
    console.log(followers);
    const newFollowers = followers.filter(
      (user) => user.id !== userData!.me!.id
    );
    console.log(newFollowers);
    setFollowers(newFollowers);
  };
  console.log(data.club);
  if (fetching) return <>loading..</>;
  if (error) return <Layout>{error.message}</Layout>;
  if (!data?.club) return <Layout>couldn't find the club</Layout>;

  return (
    <Layout>
      {/* <Card>
        <Heading mb={4}>{data.club.name}</Heading>
        <HStack>
          <ClubFollowButton
            followerList={data.club.followers as User[]}
            data={userData}
            clubId={data.club.id}
            addFollower={addFollower}
            removeFollower={removeFollower}
          />
          <ClubJoinButton club={data.club as ClubType} />
        </HStack>

        <Box mt={4}>
          <Text variant={"label"} mb={1}>
            <Icon as={BsPersonFill} w={3} h={3} mr={1} />
            {data.club.admins[0].firstname + " " + data.club.admins[0].lastname}
          </Text>
          <Text variant={"label"} mb={1}>
            <PhoneIcon w={3} h={3} mr={1} />
            {data.club.phoneNumber}
          </Text>
          <Text variant={"label"}>
            <EmailIcon w={3} h={3} mr={1} />
            {data.club.email}
          </Text>
        </Box>

        <Text variant={"body-2"} marginY={4}>
          {data.club.description}
        </Text>
        <Box onClick={onOpen} display={"inline"}>
          <Text variant={"body-3"} display={"inline"}>
            <b>{followers.length}</b> {pluralize(followers.length, "Follower")},{" "}
          </Text>
          <Text variant={"body-3"} display={"inline"}>
            <b>{members.length}</b> {pluralize(members.length, "Member")}
          </Text>
        </Box>
      </Card> */}
      <ClubSimpleCard club={data.club as ClubType} />

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
                  <Text variant='body-3'>Followers ({followers.length})</Text>
                </Tab>
                <Tab>
                  <Text variant='body-3'>Members ({members.length})</Text>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel paddingY={0} paddingX={2} maxH='sm' overflowY='auto'>
                  {followers.map((attendee) => (
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
      </Modal>

      <Card></Card>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Club);
