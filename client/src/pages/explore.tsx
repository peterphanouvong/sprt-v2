import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React, { useState } from "react";
import { ClubList } from "../components/ClubList";
import { EventList } from "../components/EventList";
import { Layout } from "../components/Layout";
import {
  Club,
  Event,
  useClubsQuery,
  useEventsQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
// import { useIsAuth } from "../utils/useIsAuth";

interface Props {}

const Explore: React.FC<Props> = ({}) => {
  const [selectedTag, setSelectedTag] = useState<"clubs" | "events">("clubs");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [{ data: eventData }] = useEventsQuery();
  const [{ data: clubData }] = useClubsQuery();

  const handleChange = (e: any) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };
  // useIsAuth();
  return (
    <Layout title="Explore">
      <Head>
        <title>Explore | sprt</title>
      </Head>

      <Heading variant="h4" as="h4">
        Explore
      </Heading>
      <Box position="sticky" top="55px" bg="white" zIndex="10">
        <HStack py={2}>
          <Tag
            variant={selectedTag === "clubs" ? "solid" : "subtle"}
            onClick={() => setSelectedTag("clubs")}
            _hover={{ cursor: "pointer" }}
          >
            Clubs
          </Tag>
          <Tag
            variant={selectedTag === "events" ? "solid" : "subtle"}
            onClick={() => setSelectedTag("events")}
            _hover={{ cursor: "pointer" }}
          >
            Events
          </Tag>
        </HStack>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input placeholder="redfox..." onChange={handleChange} />
        </InputGroup>

        <Divider my={2} />
      </Box>

      {/* <Divider /> */}

      {selectedTag === "events" && eventData && (
        <EventList
          sorryText="Looks like there are no events here. Check what you've searched for."
          events={
            eventData.events.filter((x) => {
              if (searchQuery === "") return true;
              return x.title.toLowerCase().includes(searchQuery.toLowerCase());
            }) as Event[]
          }
        />
      )}
      {selectedTag === "clubs" && clubData && (
        <ClubList
          sorryText="Looks like there are no clubs here. Check what you've searched for."
          clubs={
            clubData.clubs.filter((x) => {
              if (searchQuery === "") return true;
              return x.name.toLowerCase().includes(searchQuery.toLowerCase());
            }) as Club[]
          }
        />
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Explore);
