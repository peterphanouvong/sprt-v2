import { Box, Heading, HStack, Text } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { EventTemplate } from "../generated/graphql";
import { TemplateEventDeleteModal } from "./TemplateEventDeleteModal";

interface Props {
  template: EventTemplate;
}

export const TemplateEventCard: React.FC<Props> = ({ template }) => {
  const router = useRouter();

  // console.log(template);

  return (
    <Box
      width='100%'
      borderRadius='md'
      borderWidth='1px'
      padding={4}
      bgColor='white'
      shadow='sm'
      height='40'
      position='relative'
    >
      <HStack justifyContent='space-between'>
        <Heading mb={2} as='h5' variant='h5' fontWeight='semibold'>
          {template.templateName}
        </Heading>
        <TemplateEventDeleteModal templateId={template.id} />
      </HStack>
      <Text variant='body-3'>{template.title}</Text>
      <Text variant='body-3'>{template.venue}</Text>

      <ButtonGroup position='absolute' bottom={4}>
        <NextLink href={`/new-event/from-template/${template.id}`}>
          <Button variant='solid' size='sm' colorScheme='gray'>
            Create event from template
          </Button>
        </NextLink>
        <Button
          onClick={() => router.push(`/templates/${template.id}`)}
          variant='outline'
          size='sm'
          colorScheme='gray'
        >
          Edit
        </Button>
      </ButtonGroup>
      {/* <TemplateEventDeleteModal /> */}
      {/* </BaseCard> */}
    </Box>
  );
};
