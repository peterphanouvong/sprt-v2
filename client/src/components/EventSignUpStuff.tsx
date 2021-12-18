import { Alert, AlertIcon, Box, Button, Text } from "@chakra-ui/react";
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

  const [friendForm, setFriendForm] = React.useState(false);

  return hasSignedUp ? (
    <Box>
      <Alert alignItems="start" mb={4} status="success">
        <AlertIcon />
        <Box>
          <Text variant="body-2">
            You've been added to the waitlist for this event!
          </Text>
          {clubBeemId && (
            <Text variant="body-2">
              Please pay on beem to confirm your spot 😊 ({clubBeemId})
            </Text>
          )}
        </Box>
      </Alert>

      <Button
        size="sm"
        variant="ghost"
        onClick={() => setFriendForm(!friendForm)}
      >
        Join for a friend
      </Button>

      {friendForm && (
        <EventSignUpForm
          eventId={parseInt(id)}
          isFull={false}
          setHasSignedUp={setHasSignedUp}
        />
      )}
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
