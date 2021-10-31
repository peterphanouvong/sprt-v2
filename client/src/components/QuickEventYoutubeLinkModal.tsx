import {
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Text,
  FormLabel,
} from "@chakra-ui/react";
import React from "react";
import { useUpdateQuickEventMutation } from "../generated/graphql";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { useRouter } from "next/router";

interface Props {
  eventId: number;
  youtubeLinkInitial?: string;
}

export const QuickEventYoutubeLinkModal: React.FC<Props> = ({
  eventId,
  youtubeLinkInitial,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useIsMobileScreen();
  const initialRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [youtubeURL, setYoutubeURL] = React.useState<string>("");

  const [, updateQuickEvent] = useUpdateQuickEventMutation();

  const submit = () => {
    console.log(youtubeURL);
    console.log(eventId);
    updateQuickEvent({
      updateQuickEventId: eventId,
      updateQuickEventInput: {
        youtubeURL: youtubeURL,
      },
    });
    router.reload();
  };

  console.log(youtubeLinkInitial);

  return (
    <>
      <Button mt={2} variant='outline' color='blue.500' onClick={onOpen}>
        Upload Youtube Link
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            padding={4}
          >
            <Heading variant='h5' as='h5'>
              Upload Youtube Link
            </Heading>
            <CloseButton onClick={onClose} />
          </Box>
          <Divider />
          <ModalBody>
            <Text>Upload a Youtube URL and mark this event as closed</Text>
            <FormLabel mt={8}>URL</FormLabel>
            <Input
              ref={initialRef}
              onChange={(e: any) => setYoutubeURL(e.target.value)}
              // value={youtubeLinkInitial ? youtubeLinkInitial : ""}
              placeholder={`https://www.youtube.com/watch?v=xxxxxxx`}
            ></Input>
          </ModalBody>

          <Flex padding={4} justifyContent='flex-end'>
            <Button
              size={isMobile ? "sm" : "md"}
              variant='ghost'
              colorScheme='gray'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              size={isMobile ? "sm" : "md"}
              colorScheme='blue'
              onClick={submit}
            >
              Save
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};
