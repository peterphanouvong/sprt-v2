import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import {
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";
import {
  ClubByAdminIdQuery,
  useUploadBannerImageMutation,
} from "../generated/graphql";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";

interface Props {
  club: ClubByAdminIdQuery;
}

const ClubBanner: React.FC<Props> = ({ club }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, uploadBannerImage] = useUploadBannerImageMutation();
  const isMobile = useIsMobileScreen();

  const onDrop = useCallback(async ([file]) => {
    console.log(file);
    await uploadBannerImage({ file, clubname: club.clubByAdminId.name }).catch(
      console.error
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleBannerClick = () => {
    console.log("edit me");
    onOpen();
  };

  const clubName = club.clubByAdminId.name.replace(" ", "_");
  console.log(club);

  return (
    <>
      <Box mb={4} position='relative'>
        {/* <AspectRatio
          ratio={21 / 9}
          maxW={isMobile ? "100%" : "60%"}
          position='relative'
        > */}
        <Image
          // display='block'
          marginLeft='auto'
          marginRight='auto'
          objectFit='cover'
          onClick={handleBannerClick}
          _hover={{
            cursor: "pointer",
          }}
          src={`https://storage.cloud.google.com/test-sprt-bucket/${clubName}/banner_image.png`}
          // src={`https://storage.googleapis.com/test-sprt-bucket/Kevin's_Club/players_banner.jpeg`}
          alt='banner picture'
          fallback={
            <Image
              src='https://storage.googleapis.com/test-sprt-bucket/default-banner2'
              // htmlHeight='10px'
              // htmlWidth='10%'
              onClick={handleBannerClick}
            />
          }
        />
        {/* </AspectRatio> */}
        <Image
          position='absolute'
          top='80%'
          left='clamp(1em, 9%, 8em)'
          border='1px solid black'
          borderRadius='full'
          boxSize={isMobile ? 28 : 40}
          src={`https://storage.cloud.google.com/test-sprt-bucket/Kevin's_Club/stings_logo.png`}
        />
      </Box>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Banner Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <div {...getRootProps()}>
              <input accept='image/*' type='file' {...getInputProps()} />
              <Box alignItems='center' display='flex' flexDirection='column'>
                {isDragActive ? (
                  <Button> Drop the files here ...</Button>
                ) : (
                  <Button>
                    <Icon as={FaUpload} mr={2} /> Upload Image
                  </Button>
                )}
                <Text mt={4}>Upload your banner picture or drag and drop!</Text>
              </Box>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant='ghost' onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { ClubBanner };
