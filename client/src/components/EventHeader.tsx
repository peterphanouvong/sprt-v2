import {
  Skeleton,
  Heading,
  Box,
  HStack,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useEventQuery } from "../generated/graphql";
import { parseDatePretty } from "../utils/parseDate";
import { ClubIcon } from "./ClubIcon";

interface Props {
  eventId: number;
}

const EventHeader: React.FC<Props> = ({ eventId }) => {
  const [{ data, fetching, error }] = useEventQuery({
    pause: eventId === -1,
    variables: {
      id: eventId,
    },
  });

  if (error) return <>there was an error</>;
  return (
    <Box>
      <HStack mb={2}>
        <SkeletonCircle isLoaded={!!data?.event && !fetching}>
          <ClubIcon />
        </SkeletonCircle>
        <Box display="flex" alignItems="center">
          <Skeleton isLoaded={!!data?.event?.host.username}>
            <Text display="inline" variant="label" fontWeight="normal">
              <b>{data?.event?.host.username || "username"}</b> is hosting
            </Text>
          </Skeleton>
        </Box>
      </HStack>

      <Skeleton isLoaded={!!data?.event && !fetching}>
        <Heading variant="h2" as="h2" mb={1}>
          {data?.event?.title || "Title"}
        </Heading>
      </Skeleton>

      <Skeleton isLoaded={!!data?.event && !fetching}>
        <Text variant="label">
          {data?.event?.startTime
            ? `${parseDatePretty(data.event.startTime)} [
          ${data?.event?.location}]`
            : "Mon, Jan 01 @ 10:00 am [location]"}
        </Text>
      </Skeleton>
    </Box>
  );
};

export { EventHeader };
