import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Heading, Text } from "@chakra-ui/react";
import { QuickEventForm } from "../../components/QuickEventForm";

interface Props {}

const QuickEvent: React.FC<Props> = ({}) => {
  return (
    <>
      <Heading as="h1" variant="h1">
        Quick Event
      </Heading>
      <Text variant="body-2">Create an event and manage your attendees.</Text>

      <QuickEventForm />
    </>
  );
};

export default withUrqlClient(createUrqlClient)(QuickEvent);
