import React from "react";
import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";

interface Props {}

const Index: React.FC<Props> = ({}) => {
  return (
    <Box p={4}>
      <Text
        bgGradient="linear(to-l,#FF0080, #F6AD54)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        Welcome to Developer Help!
      </Text>
      <VStack alignItems="left">
        <HStack>
          <Button colorScheme="primary">Hello</Button>
          <Button colorScheme="primary" variant="outline">
            Hello
          </Button>
          <Button colorScheme="primary" variant="ghost">
            Hello
          </Button>
        </HStack>
        <HStack>
          <Button colorScheme="secondary">Hello</Button>
          <Button colorScheme="secondary" variant="outline">
            Hello
          </Button>
          <Button colorScheme="secondary" variant="ghost">
            Hello
          </Button>
        </HStack>
        <HStack>
          <Button colorScheme="basic">Hello</Button>
          <Button colorScheme="basic" variant="outline">
            Hello
          </Button>
          <Button colorScheme="basic" variant="ghost">
            Hello
          </Button>
        </HStack>
      </VStack>

      <Box mt={4} />
    </Box>
  );
};

export default Index;
