import { Grid } from "@chakra-ui/react";
import React from "react";
import { BaseContent } from "./BaseContent";
import { BaseSection } from "./BaseSection";
import { EventNavCard } from "./EventNavCard";
import { EventTemplateList } from "./EventTemplateList";

interface Props {
  setContent: (arg0: any) => void;
  content: string;
}

const EventChooseTemplateContent: React.FC<Props> = ({
  setContent,
  content,
}) => {
  const navigateToEdit = () => {
    setContent("editTemplate");
  };

  return (
    <BaseContent>
      <BaseSection title="Choose your template">
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
                disabled: true,
              },
            ]}
          />

          <EventTemplateList navigateToEdit={navigateToEdit} />
        </Grid>
      </BaseSection>
    </BaseContent>
  );
};

export { EventChooseTemplateContent };
