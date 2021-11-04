import { Box, Grid } from "@chakra-ui/react";
import React, { useContext } from "react";
import { TemplateContext } from "../context/templateContext";
import { BaseContent } from "./BaseContent";
import { EventFreshForm } from "./EventFreshForm";
import { EventNavCard } from "./EventNavCard";

interface Props {
  setContent: (arg0: any) => void;
  content: string;
}

const EventEditTemplateContent: React.FC<Props> = ({ setContent, content }) => {
  const { selectedTemplateId } = useContext(TemplateContext);
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
              title: "Choose your template",
              link: "chooseTemplate",
            },
            {
              title: "Create event",
              link: "editTemplate",
            },
          ]}
        />

        <Box>
          <EventFreshForm templateId={selectedTemplateId} />
        </Box>
      </Grid>
    </BaseContent>
  );
};

export { EventEditTemplateContent };
