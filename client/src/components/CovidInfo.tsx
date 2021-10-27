import { Box, ListItem, UnorderedList, Text } from "@chakra-ui/react";
import React from "react";

interface Props {}

const CovidInfo: React.FC<Props> = ({}) => {
  return (
    <Box
      marginTop={4}
      padding={4}
      borderLeft="4px solid orange"
      bgColor="#FEEBC8"
      borderRadius="4px"
    >
      <Text fontWeight="bold" marginBottom={2}>
        COVID SAFETY RULES &#9432;
      </Text>
      <UnorderedList>
        <ListItem>Please use the hand sanitiser available</ListItem>
        <ListItem>No spectators allowed</ListItem>
        <ListItem>
          A <b>mask does NOT have to be worn during training</b> but must be
          available at all times. If you are not playing then you will need to
          have it on.
        </ListItem>
        <ListItem>Check in with the venues QR code when entering</ListItem>
        <ListItem>
          You must be double vaxxed to attend for now. Restrictions are easing
          soon for all players regardless of vaccinations so hang tight!
        </ListItem>
      </UnorderedList>
    </Box>
  );
};

export { CovidInfo };
