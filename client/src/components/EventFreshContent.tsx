import { Grid } from "@chakra-ui/react";
import React from "react";
import { BaseContent } from "./BaseContent";
import { EventFreshForm } from "./EventFreshForm";
import { EventNavCard } from "./EventNavCard";

interface Props {
  setContent: (arg0: any) => void;
  content: string;
}

const EventFreshContent: React.FC<Props> = ({ setContent, content }) => {
  return (
    <BaseContent>
      <Grid templateColumns="1fr 3fr" gridGap={4} alignItems="start">
        <EventNavCard
          content={content}
          setContent={setContent}
          navItems={[
            {
              title: "Choose your path",
              link: "choosePath",
            },
            {
              title: "Create event",
              link: "fresh",
            },
          ]}
        />

        <EventFreshForm />
      </Grid>
    </BaseContent>
  );
};

export { EventFreshContent };
