import { Button, ButtonProps, useToast } from "@chakra-ui/react";
import React from "react";
import { useAddAttendeeMutation } from "../generated/graphql";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";

type Props = ButtonProps & {
  eventId: number;
  eventTitle: string;
};

const EventJoinButton: React.FC<Props> = ({
  eventId,
  eventTitle,
  ...props
}) => {
  const [, addAttendee] = useAddAttendeeMutation();
  const toast = useToast();

  const isMobile = useIsMobileScreen();

  const joinEvent = async () => {
    const { error } = await addAttendee({ eventId: eventId });
    if (!error) {
      // router.reload();
      toast({
        title: "Joined event",
        variant: "subtle",
        description: `We've added you as an attendee to "${eventTitle}"`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      // router.reload();
    } else if (error) {
      toast({
        title: "Error",
        variant: "subtle",
        position: "top",
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Button
      {...props}
      // variant="outline"
      onClick={joinEvent}
      size={isMobile ? "sm" : "md"}
    >
      Join event
    </Button>
  );
};

export { EventJoinButton };
