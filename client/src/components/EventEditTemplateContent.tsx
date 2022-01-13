import { Box, Grid, Spinner } from "@chakra-ui/react";
import React, { useContext } from "react";
import { TemplateContext } from "../context/templateContext";
import { useEventTemplateQuery } from "../generated/graphql";
import { parseDate } from "../utils/parseDate";
import { parseRichText } from "../utils/parseRichText";
import { BaseContent } from "./BaseContent";
import { EventFreshForm } from "./EventFreshForm";
import { EventNavCard } from "./EventNavCard";

interface Props {
  setContent: (arg0: any) => void;
  content: string;
}

const EventEditTemplateContent: React.FC<Props> = ({ setContent, content }) => {
  const { selectedTemplateId } = useContext(TemplateContext);

  const [{ data, fetching }] = useEventTemplateQuery({
    pause: selectedTemplateId === undefined,
    variables: {
      eventTemplateId: Number(selectedTemplateId as string),
    },
  });

  if (fetching) {
    return <Spinner />;
  }

  if (!data?.eventTemplate && !fetching) {
    return <div>Not found</div>;
  }

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
          <EventFreshForm
            initialValues={{
              title: data?.eventTemplate.title,
              venue: data?.eventTemplate.venue,
              date: parseDate(data?.eventTemplate.date),
              address: data?.eventTemplate.address,
              price: data?.eventTemplate.price
                ? data?.eventTemplate.price.toString()
                : undefined,
              description: data?.eventTemplate.description
                ? parseRichText(data?.eventTemplate.description)
                : parseRichText(""),
              startTime: data?.eventTemplate.startTime,
              endTime: data?.eventTemplate.endTime,
              capacity: data?.eventTemplate.capacity
                ? data.eventTemplate.capacity.toString()
                : undefined,
              youtubeLink: data?.eventTemplate.youtubeLink,
              clubBeemId: data?.eventTemplate.clubBeemId,
              bsb: data?.eventTemplate.bsb,
              accountNumber: data?.eventTemplate.accountNumber,
            }}
          />
        </Box>
      </Grid>
    </BaseContent>
  );
};

export { EventEditTemplateContent };
