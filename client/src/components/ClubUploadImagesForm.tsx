import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { AttachmentIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";
import {
  ClubByAdminIdQuery,
  useUploadBannerImageMutation,
} from "../generated/graphql";

interface Props {
  club: ClubByAdminIdQuery;
}

const ClubUploadImagesForm: React.FC<Props> = ({ club }) => {
  const [, uploadBannerImage] = useUploadBannerImageMutation();
  const [bannerFile, setBannerFile] = React.useState<File>();

  const onDrop = useCallback(async ([file]) => {
    console.log(file);
    setBannerFile(file);
    await uploadBannerImage({ file, clubname: club.clubByAdminId.name }).catch(
      console.error
    );
    console.log(bannerFile?.name);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {bannerFile ? (
        <Text>
          <AttachmentIcon /> {bannerFile?.name}
        </Text>
      ) : (
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
      )}
    </>
  );
};

export { ClubUploadImagesForm };
