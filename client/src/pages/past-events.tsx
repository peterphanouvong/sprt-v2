import { Box, Button, Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import { BaseContent } from "../components/BaseContent";
import { BaseLayout } from "../components/BaseLayout";
import { BasePageHeader } from "../components/BasePageHeader";
import { EventListSideNav } from "../components/EventListSideNav";
import { PastEventTable } from "../components/PastEventTable";
import { usePastEventsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

interface Props {}

const PastEvents: React.FC<Props> = ({}) => {
  useIsAuth();
  const [{ data, fetching }] = usePastEventsQuery();
  if (fetching) {
    return (
      <BaseLayout>
        <BaseContent>
          <Spinner />
        </BaseContent>
      </BaseLayout>
    );
  }
  if (!fetching && !data) return <div>No data</div>;
  return (
    <BaseLayout>
      <Head>
        <title>Events | sprt</title>
      </Head>
      <BasePageHeader>Events</BasePageHeader>

      <BaseContent>
        <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
          <Box>
            <EventListSideNav />
          </Box>
          <Box>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading variant="h6" as="h6">
                Past Events
              </Heading>
              <NextLink href="new-event">
                <a>
                  <Button size="sm" variant="outline" colorScheme="gray">
                    Create event
                  </Button>
                </a>
              </NextLink>
            </Flex>
            <PastEventTable pastEvents={data!.pastEvents} />
          </Box>
        </Grid>
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(PastEvents);
