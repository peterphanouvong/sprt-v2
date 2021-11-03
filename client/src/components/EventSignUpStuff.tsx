import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import React from "react";
import { BaseCard } from "./BaseCard";
import { BaseSection } from "./BaseSection";
import { EventSignUpForm } from "./EventSignUpForm";

interface Props {
  id: string;
}

const EventSignUpStuff: React.FC<Props> = ({ id }) => {
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
        Please pay on beem to confirm your spot 😊 (__some_beem_id__)
      </Alert>
    </Box>
  ) : (
    <BaseCard padding={6}>
      <BaseSection title="Sign up">
        <EventSignUpForm
          eventId={parseInt(id)}
          isFull={false}
          setHasSignedUp={setHasSignedUp}
        />
      </BaseSection>
    </BaseCard>
  );
};

export { EventSignUpStuff };
