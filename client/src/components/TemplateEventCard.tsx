import {
  AddIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { Box, Heading, Text } from "@chakra-ui/layout";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { EventTemplate } from "../generated/graphql";
import { convertEpochToDate } from "../utils/parseDate";

interface Props {
  template: EventTemplate;
}

export const TemplateEventCard: React.FC<Props> = ({ template }) => {
  const router = useRouter();
  return (
    <Box
      _hover={{ cursor: "pointer" }}
      onClick={() => router.push(`/templates/${template.id}`)}
      width='100%'
      borderRadius='lg'
      borderWidth='1px'
      padding={4}
      textAlign='center'
      position='relative'
    >
      <Menu placement='top-end' strategy='absolute'>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon />}
          variant='ghost'
          onClick={(e) => e.stopPropagation()}
          size='sm'
        />
        <MenuList>
          <MenuItem icon={<AddIcon />} command='⌘T'>
            New Tab
          </MenuItem>
          <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
            New Window
          </MenuItem>
          <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
            Open Closed Tab
          </MenuItem>
          <MenuItem icon={<EditIcon />} command='⌘O'>
            Open File...
          </MenuItem>
        </MenuList>
      </Menu>
      {/* <BaseCard width='100%'> */}
      <Heading as='h4' variant='h4' fontWeight='semibold'>
        {template.templateName}
      </Heading>
      <Text variant='body-3'>{template.title}</Text>
      <Text variant='body-3'>{convertEpochToDate(template.date)}</Text>
      <Text variant='body-3'>{template.venue}</Text>
      <Text variant='body-3'>{template.capacity}</Text>
      <Text variant='body-3'>{template.startTime}</Text>
      {/* </BaseCard> */}
    </Box>
  );
};
