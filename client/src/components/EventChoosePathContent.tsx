import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { BaseContent } from "./BaseContent";
import { BaseSection } from "./BaseSection";
import { EventNavCard } from "./EventNavCard";

interface Props {
  setContent: (arg0: any) => void;
  content: string;
}

const EventChoosePathContent: React.FC<Props> = ({ setContent, content }) => {
  return (
    <BaseContent>
      <BaseSection title="Choose your path">
        <Grid templateColumns="1fr 2fr" gridGap={4} alignItems="start">
          <EventNavCard
            content={content}
            setContent={setContent}
            navItems={[
              {
                title: "Choose your path",
                description: "Create an event from a template or start fresh!",
                link: "choosePath",
              },
            ]}
          />

          <Flex flexDir="column" alignItems="stretch">
            <Button
              colorScheme="brand"
              onClick={() => setContent("chooseTemplate")}
              flexDirection="column"
              height="150px"
              variant="solid"
              borderRadius="sm"
            >
              <Heading mb={2} variant="h6" as="h6">
                From template
              </Heading>
              <Text variant="body-3">Create an event based off a template</Text>
            </Button>

            <Box mb={2} />

            <Button
              colorScheme="gray"
              onClick={() => setContent("fresh")}
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
          </Flex>
        </Grid>
      </BaseSection>
    </BaseContent>
  );
};

export { EventChoosePathContent };
