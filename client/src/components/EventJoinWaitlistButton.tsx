import { Button, ButtonProps } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/modal";
import React from "react";

import { useIsMobileScreen } from "../utils/useIsMobileScreen";

type Props = ButtonProps & {
  joinWaitlist: () => Promise<void>;
};

const EventJoinWaitlistButton: React.FC<Props> = ({ joinWaitlist }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  const isMobile = useIsMobileScreen();

  return (
    <>
      <Button size={isMobile ? "xs" : "sm"} onClick={() => setIsOpen(true)}>
        (FULL) Join waitlist
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Join waitlist
            </AlertDialogHeader>

            <AlertDialogBody>
              This event is full, would you like to join the waitlist instead?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                size={isMobile ? "xs" : "sm"}
                ref={cancelRef}
                variant="ghost"
                colorScheme="gray"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                size={isMobile ? "xs" : "sm"}
                colorScheme="brand"
                onClick={joinWaitlist}
                ml={3}
              >
                Join waitlist
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export { EventJoinWaitlistButton };
