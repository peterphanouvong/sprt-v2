import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import React from "react";
import { BaseSection } from "./BaseSection";
import { EventSignUpForm } from "./EventSignUpForm";

interface Props {
  id: string;
  clubBeemId: string;
}

const EventSignUpStuff: React.FC<Props> = ({ id, clubBeemId }) => {
  const [hasSignedUp, setHasSignedUp] = React.useState(
    typeof window !== "undefined"
      ? localStorage.getItem(`event:${id}`) == "true"
      : true
  );
  return hasSignedUp ? (
    <Box>
      <Alert mb={2} status="success">
        <AlertIcon />
        You've been added to the waitlist for this event!
      </Alert>
      <Alert status="info">
        <AlertIcon />
        {/* TODO: remove hard coding beem id*/}
        Please pay on beem to confirm your spot 😊 ({clubBeemId})
      </Alert>
    </Box>
  ) : (
    <BaseSection title="Join event">
      <EventSignUpForm
        eventId={parseInt(id)}
        isFull={false}
        setHasSignedUp={setHasSignedUp}
      />
    </BaseSection>
  );
};

export { EventSignUpStuff };
