import { Box, Button, Image } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadImageMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface Props {}

const testpage: React.FC<Props> = ({}) => {
  const [, uploadImage] = useUploadImageMutation();

  const onDrop = useCallback(async ([file]) => {
    // Do something with the files
    console.log(file);
    await uploadImage({ file });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()}>
        <input accept='image/*' type='file' {...getInputProps()} />
        {isDragActive ? (
          <Button>Drop the files here ...</Button>
        ) : (
          <Button>
            Drag 'n' drop some files here, or click to select files
          </Button>
        )}
      </div>
      <Box boxSize='sm'>
        <Image
          src='https://storage.googleapis.com/test-sprt-bucket/v1.jfif'
          alt='google storage pic'
        />
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(testpage);
