import { Grid } from "@chakra-ui/react";
import React from "react";
import { BaseContent } from "./BaseContent";
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
              disabled: true,
            },
          ]}
        />

        <EventTemplateList navigateToEdit={navigateToEdit} />
      </Grid>
    </BaseContent>
  );
};

export { EventChooseTemplateContent };
