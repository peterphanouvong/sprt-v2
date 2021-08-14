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

interface Props {
  userType: string;
  userList: Array<User>;
}

const AccordionUsers: React.FC<Props> = ({ userType, userList }) => {
  return (
    <Box mt={4}>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              <Text fontWeight='medium'>{userType}</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <UnorderedList>
              {userList.map((attendee) => (
                <ListItem key={attendee.id}>{attendee.username}</ListItem>
              ))}
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export { AccordionUsers };
