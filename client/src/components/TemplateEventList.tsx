import { SimpleGrid } from "@chakra-ui/layout";
import React from "react";
import { EventTemplate, useEventTemplatesQuery } from "../generated/graphql";
import { TemplateEventCard } from "./TemplateEventCard";

interface Props {}

export const TemplateEventList: React.FC<Props> = ({}) => {
  const [{ data }] = useEventTemplatesQuery();

  console.log(data);

  return (
    <>
      {/* <Heading>Old Templates:</Heading> */}
      <SimpleGrid minChildWidth='200px' spacing='5vw' mt={8} marginX={"5vw"}>
        {data?.eventTemplates
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
