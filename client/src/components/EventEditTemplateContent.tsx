import { Box, Grid } from "@chakra-ui/react";
import React, { useContext } from "react";
import { TemplateContext } from "../context/templateContext";
import { BaseContent } from "./BaseContent";
import { BaseSection } from "./BaseSection";
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
              {
                title: "Choose your template",
                description: "Pick the template you want to use for this event",
                link: "chooseTemplate",
              },
              {
                title: "Create event",
                description: "Edit your chosen template and finish!",
                link: "editTemplate",
              },
            ]}
          />

          <Box>
            <EventFreshForm templateId={selectedTemplateId} />
          </Box>
        </Grid>
      </BaseSection>
    </BaseContent>
  );
};

export { EventEditTemplateContent };
