import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  UnorderedList,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { User } from "../generated/graphql";
import { MetaDataText } from "./ MetaDataText";

interface Props {
  userType: string;
  userList: Array<User>;
}

const AccordionUsers: React.FC<Props> = ({ userType, userList }) => {
  return (
    <Box mt={4}>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton
            _hover={{
              backgroundColor: "gray.50",
            }}
          >
            <Box flex="1" textAlign="left">
              <Text fontWeight="medium">{userType}</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel p={0}>
            {/* <UnorderedList> */}
            {userList.map((attendee) => (
              <ListItem
                paddingY={1}
                paddingX={4}
                borderTop="1px solid"
                _hover={{
                  backgroundColor: "gray.50",
                }}
                borderColor="gray.100"
                listStyleType="none"
                key={attendee.id}
              >
                <MetaDataText>{attendee.username}</MetaDataText>
              </ListItem>
            ))}
            {/* </UnorderedList> */}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export { AccordionUsers };
