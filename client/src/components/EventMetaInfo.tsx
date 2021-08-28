import { Box, BoxProps, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BsCalendar, BsPeople } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { parseDatePretty } from "../utils/parseDate";

type Props = BoxProps & {
  location: string;
  startTime: string | undefined;
  endTime: string | undefined;
  capacity: number | undefined;
};

const EventMetaInfo: React.FC<Props> = ({
  location,
  startTime,
  endTime,
  capacity,
  ...props
}) => {
  return (
    <Box {...props}>
      <Flex>
        <Text variant="label">
          <Icon as={FaMapMarkerAlt} w={3} h={3} mr={3} />
        </Text>
        <Text variant="label">{location}</Text>
      </Flex>
      <Flex>
        <Text variant="label">
          <Icon as={BsCalendar} w={3} h={3} mr={3} />
        </Text>
        <Text variant="label">{parseDatePretty(startTime)}</Text>
      </Flex>
      {endTime && (
        <Flex>
          <Text variant="label">
            <Icon as={BsCalendar} w={3} h={3} mr={3} />
          </Text>
          <Text variant="label">{parseDatePretty(endTime)}</Text>
        </Flex>
      )}
      {capacity && (
        <Flex>
          <Text variant="label">
            <Icon as={BsPeople} w={3} h={3} mr={3} />
          </Text>
          <Text variant="label">{capacity}</Text>
        </Flex>
      )}
    </Box>
  );
};

export { EventMetaInfo };
