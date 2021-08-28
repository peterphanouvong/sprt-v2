import { Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  clubName?: string;
  hostFirstname: string;
  hostLastname: string;
}

const EventCardHostAndLocation: React.FC<Props> = ({
  clubName,
  hostFirstname,
  hostLastname,
}) => {
  return clubName === undefined ? (
    <Text variant="body-3" mt={1}>
      Hosted by{" "}
      <b>
        {hostFirstname} {hostLastname}
      </b>
    </Text>
  ) : (
    <Text variant="body-3" mt={1}>
      Hosted by <b>{clubName}</b>
    </Text>
  );
};

export { EventCardHostAndLocation };
