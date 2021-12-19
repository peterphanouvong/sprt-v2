import { Alert, AlertIcon, Link, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface Props {
  numConfirmed: number | undefined;
  id: string;
}

const EventJoinAttendeeInfoCard: React.FC<Props> = ({ numConfirmed, id }) => {
  return (
    <Alert mb={4} status="info">
      <AlertIcon />
      <Text variant="body-2" mr={1}>
        There are currently <b>{numConfirmed} confirmed</b> people going to this
        event.
      </Text>
      <NextLink href={`/events/${id}/attendees`}>
        <Link textDecor="underline">See attendees</Link>
      </NextLink>
    </Alert>
  );
};

export { EventJoinAttendeeInfoCard };
