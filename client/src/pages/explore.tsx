import { SearchIcon } from "@chakra-ui/icons";
import {
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React, { useContext, useState } from "react";
import { ClubList } from "../components/ClubList";
import { EventList } from "../components/EventList";
import { Layout } from "../components/Layout";
import { ExploreContext } from "../context/exploreContext";
import {
  Club,
  Event,
  useClubsQuery,
  useEventsQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface Props {}

const Explore: React.FC<Props> = ({}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [{ data: eventData }] = useEventsQuery();
  const [{ data: clubData }] = useClubsQuery();

  const { selectedTag, setSelectedTag } = useContext(ExploreContext);

  const handleChange = (e: any) => {
    setSearchQuery(e.target.value);
  };
  return (
    <Layout title="Explore">
      <Head>
        <title>Explore | sprt</title>
      </Head>

      <Heading variant="h4" as="h4">
        Explore
      </Heading>

      <Tabs
        defaultIndex={selectedTag === "events" ? 0 : 1}
        mt={4}
        variant="enclosed"
      >
        <TabList>
          <Tab onClick={() => setSelectedTag("events")}>
            <Text variant="body-2">Events</Text>
          </Tab>
          <Tab onClick={() => setSelectedTag("clubs")}>
            <Text variant="body-2">Clubs</Text>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0} pt={4}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input placeholder="socials..." onChange={handleChange} />
            </InputGroup>
            {selectedTag === "events" && eventData && (
              <EventList
                sorryText="Looks like there are no events here. Check what you've searched for."
                events={
                  eventData.events.filter((x) => {
                    if (searchQuery === "") return true;
                    return x.title
                      .toLowerCase()
                      .includes(searchQuery.replace(/\s/g, "").toLowerCase());
                  }) as Event[]
                }
              />
            )}
          </TabPanel>

          <TabPanel p={0} pt={4}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input placeholder="redfox..." onChange={handleChange} />
            </InputGroup>
            {selectedTag === "clubs" && clubData && (
              <ClubList
                sorryText="Looks like there are no clubs here. Check what you've searched for."
                clubs={
                  clubData.clubs.filter((x) => {
                    if (searchQuery === "") return true;
                    return x.name
                      .toLowerCase()
                      .includes(searchQuery.replace(/\s/g, "").toLowerCase());
                  }) as Club[]
                }
              />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Explore);
