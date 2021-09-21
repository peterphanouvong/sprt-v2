import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Icon, Text } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";

interface Props {}

const UploadeCovidCertificate: React.FC<Props> = ({}) => {
  const onDrop = useCallback(async ([file]) => {
    console.log(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Box
      bg={isDragActive ? "gray.50" : "none"}
      padding={8}
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.100"
      {...getRootProps()}
    >
      <input accept="image/*" type="file" {...getInputProps()} />
      <Box alignItems="center" display="flex" flexDirection="column">
        <Button colorScheme="blue" variant="ghost">
          <Icon as={FaUpload} mr={2} /> Upload Image
        </Button>

        <Text variant="body-2" mt={4}>
          Drop the files here
        </Text>
      </Box>
    </Box>
  );
};

export { UploadeCovidCertificate };
