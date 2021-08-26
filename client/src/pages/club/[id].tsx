import {
  useDisclosure,
  Text,
  Heading,
  Box,
  HStack,
  Flex,
  Spacer,
  Icon,
  Center,
} from "@chakra-ui/react";
import Image from "next/image";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Card } from "../../components/Card";
import { Layout } from "../../components/Layout";
import {
  useClubQuery,
  Club as ClubType,
  useMeQuery,
  useEventsQuery,
  Event,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { ClubSimpleCard } from "../../components/ClubSimpleCard";
import { ClubDetailsModal } from "../../components/ClubDetailsModal";
import { EventList } from "../../components/EventList";
import { EventCreateButton } from "../../components/EventCreateButton";
import { useIsAuthorised } from "../../utils/useIsAuthorised";
import { FaVolleyballBall } from "react-icons/fa";

const Club = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data: userData, fetching: userFetching }] = useMeQuery();

  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching, error }] = useClubQuery({
    pause: intId === -1,
    variables: { clubId: intId },
  });

  const [{ data: eventData, fetching: eventFetching }] = useEventsQuery();
  const isAuthorised = useIsAuthorised(data?.club as ClubType);

  if (fetching || userFetching || eventFetching) return <>loading..</>;
  if (error) return <Layout>{error.message}</Layout>;
  if (!data) return <Layout>couldn't find the club</Layout>;
  if (!data?.club) return <Layout>couldn't find the club</Layout>;

  return (
    <Layout>
      <ClubSimpleCard
        club={data.club as ClubType}
        // modalOpen={onOpen}
        // modalClose={onClose}
        userData={userData}
        isClubPage
      />

      <Box mt={4}>
        <Flex>
          <Heading variant='h3' mt={1}>
            Events
          </Heading>
          <Spacer />
          {isAuthorised && <EventCreateButton />}
        </Flex>
      </Box>
      {eventData.events.filter((event) => event.clubId === data.club.id)
        .length > 0 ? (
        <EventList
          events={
            eventData.events.filter(
              (event) => event.clubId === data.club.id
            ) as Event[]
          }
        />
      ) : (
        <Box marginY={4} textAlign='center'>
          <Card>
            <Icon as={FaVolleyballBall} boxSize={10} mb={2} />
            <Text>Uh oh looking a little empty...</Text>
            <Text>Message the club owner to get some events started!</Text>
          </Card>
        </Box>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Club);
