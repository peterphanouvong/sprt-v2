import { SimpleGrid } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { EventTemplate, useEventTemplatesQuery } from "../generated/graphql";
import { TemplateEventCard } from "./TemplateEventCard";

interface Props {
  filterString?: string;
}

export const TemplateEventList: React.FC<Props> = ({ filterString }) => {
  const [{ data }] = useEventTemplatesQuery();
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  console.log(data);

  return (
    <>
      <SimpleGrid mt={4} columns={columns} spacing={3}>
        {data?.eventTemplates
          .filter((template) => {
            if (!filterString) {
              return true;
            } else {
              return (
                template.templateName
                  ?.toLowerCase()
                  .includes(filterString.toLowerCase()) ||
                template.title
                  ?.toLowerCase()
                  .includes(filterString.toLowerCase())
              );
            }
          })
          .sort((a, b) => parseInt(a.createdAt) - parseInt(b.createdAt))
          .map((template) => (
            <TemplateEventCard
              key={template.id}
              template={template as EventTemplate}
            />
          ))}
      </SimpleGrid>
    </>
  );
};
