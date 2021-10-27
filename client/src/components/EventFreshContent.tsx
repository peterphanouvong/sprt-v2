import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import { BaseContent } from "./BaseContent";
import { BaseSection } from "./BaseSection";
import { EventFreshForm } from "./EventFreshForm";
import { EventNavCard } from "./EventNavCard";

interface Props {
  setContent: (arg0: any) => void;
  content: string;
}

const EventFreshContent: React.FC<Props> = ({ setContent, content }) => {
  return (
    <BaseContent>
      <BaseSection flex={1} title="Create fresh event">
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
              {
                title: "Create event",
                description: "Fill out the event details and finish!",
                link: "fresh",
              },
            ]}
          />

          <Box display="flex">
            <EventFreshForm />
          </Box>
        </Grid>
      </BaseSection>
    </BaseContent>
  );
};

export { EventFreshContent };
