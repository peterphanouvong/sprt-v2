import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import { BaseContent } from "../../components/BaseContent";
import { BaseLayout } from "../../components/BaseLayout";
import { BasePageHeader } from "../../components/BasePageHeader";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/useIsAuth";

interface Props {}

const NewEvent: React.FC<Props> = ({}) => {
  useIsAuth();

  return (
    <BaseLayout>
      <Head>
        <title>NewEvent | sprt</title>
      </Head>

      <BasePageHeader>Create new event</BasePageHeader>

      <BaseContent>
        <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
          <Text variant="body-3" fontWeight="medium">
            Choose path
          </Text>

          <Flex flexDir="column" alignItems="stretch">
            <NextLink href="/new-event/choose-template">
              <Button
                colorScheme="brand"
                flexDirection="column"
                height="150px"
                variant="solid"
                borderRadius="sm"
              >
                <Heading mb={2} variant="h6" as="h6">
                  From template
                </Heading>
                <Text variant="body-3">
                  Create an event based off a template
                </Text>
              </Button>
            </NextLink>

            <Box mb={2} />
            <NextLink href="/new-event/event-details">
              <Button
                colorScheme="gray"
                flexDirection="column"
                height="150px"
                variant="solid"
                borderRadius="sm"
              >
                <Heading mb={2} variant="h6" as="h6">
                  Completely fresh
                </Heading>
                <Text variant="body-3">Create a totally new event</Text>
              </Button>
            </NextLink>
          </Flex>
        </Grid>
      </BaseContent>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(NewEvent);
